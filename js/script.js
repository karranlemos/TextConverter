window.addEventListener('load', function() {
    var converter = new TextConverter()
    var customSelectors = CustomSelect.getAllCustomSelect()
})

class TextConverter {

    constructor() {
        this.options = document.querySelector('#options-converter select')
        this.input = document.getElementById('input-converter')
        this.output = document.getElementById('output-converter')
        this.button = document.getElementById('execute-converter')

        if (!this.options || !this.input || !this.output || !this.button)
            throw 'error getting elements'
        
        this.button.addEventListener('click', this.execute_conversion.bind(this))
    }

    execute_conversion() {
        var commands = {
            'uppercase': this.convert_uppercase,
            'lowercase': this.convert_lowercase,
            'alternate-case': this.convert_alternate_case,
            'spaced-text': this.convert_spaced_text,
            'leetspeak': this.convert_leetspeak
        }

        var mode = this.options.value

        if (!(mode in commands))
            return

        var in_text = this.input.value

        var out_text = commands[mode](in_text)

        this.output.value = out_text
    }

    convert_uppercase(text) {
        return text.toUpperCase()
    }

    convert_lowercase(text) {
        return text.toLowerCase()
    }

    convert_alternate_case(text) {
        var out_text = ''
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i)
            if (i%2 === 0)
                out_text += c.toUpperCase()
            else
                out_text += c.toLowerCase()
        }
        return out_text
    }

    convert_spaced_text(text) {
        var out_text = ''
        for (let i = 0, n = text.length-1; i < n; i++) {
            out_text += text.charAt(i)+' '
        }
        out_text += text.charAt(text.length-1)
        return out_text
    }

    convert_leetspeak(text) {
        var alphabets = {
            a: "4",
            b: "8",
            e: "3",
            g: "6",
            i: "1",
            o: "0",
            p: "9",
            s: "5",
            t: "7",
            z: "2"
        }

        var out_text = ''
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i)
            out_text += alphabets[replaceDiacritics(c).toLowerCase()] || c
        }

        return out_text
    }
}

class CustomSelect {

    static errorMessages = {
        'constructor': 'Invalid format.'
    }

    constructor(container) {
        this.container = container
        this.hiddenSelect = container.querySelector('select')
        this.frontSelect = container.querySelector('div.select')

        if (!this.container || !this.hiddenSelect || !this.frontSelect)
            throw CustomSelect.errorMessages['constructor']
        
        this.frontHead = this.frontSelect.querySelector('button.select-head')
        this.frontOptions = this.frontSelect.querySelector('div.select-options')

        if (!this.frontHead || !this.frontOptions)
            throw CustomSelect.errorMessages['constructor']

        this.frontHead.addEventListener('click', this.toggleOptions.bind(this))

        this.frontHeadText = this.frontHead.querySelector('span.select-head-text')
        
        if (!this.frontHeadText)
            throw CustomSelect.errorMessages['constructor']
        
        this.hiddenOptionsIndexes = this.extractHiddenOptionsIndexes()
        
        this.fillFrontSelector()
    }

    fillFrontSelector() {
        for (let i = 0; i < this.hiddenSelect.length; i++) {
            let hiddenOptionElement = this.hiddenSelect.options[i]
            let value = hiddenOptionElement.value
            let frontText = hiddenOptionElement.textContent
            
            let frontOptionElement = document.createElement('button')
            frontOptionElement.classList.add('select-option')
            frontOptionElement.innerText = frontText
            frontOptionElement.addEventListener('click', function() {
                this.changeSelectedItem(value)
            }.bind(this))

            this.frontOptions.appendChild(frontOptionElement)
        }

        this.changeSelectedItem('uppercase')
    }

    changeSelectedItem(value) {
        this.changeHiddenSelect(value)
        this.changeFrontHead(value)
        this.closeOptions()
    }

    changeHiddenSelect(value) {
        if (value in this.hiddenOptionsIndexes)
            this.hiddenSelect.selectedIndex = this.hiddenOptionsIndexes[value]
    }

    changeFrontHead(value) {
        if (value in this.hiddenOptionsIndexes)
            this.frontHeadText.innerText = this.hiddenSelect.options[this.hiddenOptionsIndexes[value]].innerText
    }

    toggleOptions() {
        this.frontOptions.classList.toggle('show')
    }

    closeOptions() {
        this.frontOptions.classList.remove('show')
    }

    
    
    extractHiddenOptionsIndexes() {
        var hiddenOptionsIndexes = {}
        for (let i = 0; i < this.hiddenSelect.length; i++) {
            let hiddenOptionElement = this.hiddenSelect.options[i]
            let value = hiddenOptionElement.value
            hiddenOptionsIndexes[value] = i
        }
        return hiddenOptionsIndexes
    }


    static getAllCustomSelect() {
        var customSelectsObj = document.querySelectorAll('div.custom-select-container')
        var customSelects = []
        for (let customSelect of customSelectsObj) {
            try {
                customSelects.push(new CustomSelect(customSelect))
            }
            catch (err) {
                continue
            }
        }
        return customSelects
    }
}

// https://stackoverflow.com/a/863865
function replaceDiacritics(s)
{
    var diacritics =[
        /[\300-\306]/g, /[\340-\346]/g,  // A, a
        /[\310-\313]/g, /[\350-\353]/g,  // E, e
        /[\314-\317]/g, /[\354-\357]/g,  // I, i
        /[\322-\330]/g, /[\362-\370]/g,  // O, o
        /[\331-\334]/g, /[\371-\374]/g,  // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];

    var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    for (var i = 0; i < diacritics.length; i++)
    {
        s = s.replace(diacritics[i],chars[i]);
    }

    return s
}