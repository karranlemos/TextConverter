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
            'capitalized-text': this.convert_capitalized_text,
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

    convert_capitalized_text(text) {
        var out_text = ''
        var capitalize_next = true
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i)
            if (c === '.' || c === '\n') {
                capitalize_next = true
            }
            else if (capitalize_next && !Helpers.hasWhiteSpace(c)) {
                if (Helpers.isCapitalizable(c))
                    c = c.toUpperCase()
                capitalize_next = false
            }
            out_text += c
        }
        return out_text
    }

    convert_spaced_text(text) {
        var out_text = ''
        for (let i = 0, n = text.length-1; i < n; i++) {
            let c = text.charAt(i)
            out_text += c
            if (c !== '\n')
                out_text += ' '
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
            out_text += alphabets[Helpers.replaceDiacritics(c).toLowerCase()] || c
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

        window.addEventListener('click', this.closeOptionsIfClickedOutsideSelect.bind(this))
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



    closeOptionsIfClickedOutsideSelect(e) {
        var selectHeadClicked = this.frontSelect.contains(e.target)
        if (!selectHeadClicked)
            this.closeOptions()
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


class MenuPages {

    constructor() {
        this.currentPageId = ''
        this.pageSections = {}

        this.menuCentralNavbar = document.querySelector('#navbar div.central-navbar')
        if (!this.menuCentralNavbar)
            throw '"#navbar div.central-navbar" doesn\'t exist'
        var menuButtonsCollection = this.menuCentralNavbar.querySelectorAll('button')
        if (!menuButtonsCollection)
            throw '"#navbar div.central-navbar button" doesn\'t exist'
        this.mobileMenuButton = document.querySelector('#navbar button.menu-button')
        if (!this.mobileMenuButton)
        throw '"#navbar button.menu-button" doesn\'t exist'
        var pageSectionsNodes = document.querySelectorAll('main#main>section.page')
        
        for (let node of pageSectionsNodes) {
            let id = node.id
            if (id !== '')
                this.pageSections[id] = node
        }

        this.menuButtons = {}
        for (let menuButton of menuButtonsCollection) {
            let pageId = menuButton.getAttribute('data-page-id')
            if (!this.pageSections.hasOwnProperty(pageId))
                continue
            menuButton.addEventListener('click', function() {
                this.changePages(pageId)
            }.bind(this))

            this.menuButtons[pageId] = menuButton
        }

        var firstPage = Object.keys(this.pageSections)[0];
        this.changePages(firstPage)

        this.mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this))
    }

    changePages(pageId) {
        if (this.currentPageId === pageId)
            return
        if (!this.pageSections.hasOwnProperty(pageId))
            throw 'Page doesn\'t exist'
        
        if (this.pageSections.hasOwnProperty(this.currentPageId)) {
            this.menuButtons[this.currentPageId].classList.remove('current-page')
            this.pageSections[this.currentPageId].classList.remove('show')
        }
        this.menuButtons[pageId].classList.add('current-page')
        this.pageSections[pageId].classList.add('show')

        this.currentPageId = pageId

        this.menuCentralNavbar.classList.remove('mobile-show')
        this.mobileMenuButton.classList.remove('mobile-show')
    }

    toggleMobileMenu() {
        this.menuCentralNavbar.classList.toggle('mobile-show')
        this.mobileMenuButton.classList.toggle('mobile-show')
    }
}



class Helpers {
    constructor() {
        throw 'static class'
    }

    // https://stackoverflow.com/a/863865
    static replaceDiacritics(s)
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

    static isCapitalizable(c) {
        if (c.length > 1)
            c = c.charAt(1)
        return (c.toUpperCase() !== c.toLowerCase())
    }

    static hasWhiteSpace(s) {
        return /[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(s)
    }
}



var section = {
    converter: undefined,
    customSelectors: undefined
}

window.addEventListener('load', function() {
    section.converter = new TextConverter()
    section.customSelectors = CustomSelect.getAllCustomSelect()
    section.menuPages = new MenuPages();
})