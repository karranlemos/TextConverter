window.addEventListener('load', function() {
    var converter = new TextConverter()
})

class TextConverter {

    constructor() {
        this.options = document.getElementById('options-converter')
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