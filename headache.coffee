###
Copyright (c) 2022 Gabriel G. de Brito

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the “Software”), to deal 
in the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.
###

brainloop = (ip, text) ->

    char    = text[ip]
    pad     = 0
    forward = if char is ']' then false else true

    if char is '['
        other = ']'
        ip += 1
    else
        other = '['
        ip -= 1

    loop

        if not text[ip]?
            alert "error on loops!"
            return undefined

        if text[ip] is other and pad is 0
            return ip

        if text[ip] is other and pad > 0
            pad -= 1
        else if text[ip] is other and pad == 0
            return ip + 1

        pad += 1 if text[ip] is char

        if forward
            ip += 1
        else
            ip -= 1

runText = (text, input) ->

    input_c = 0
    output  = ""
    mem     = []
    dp      = 0
    ip      = 0

    while text[ip]?

        switch text[ip]
            when '>' then dp += 1
            when '<' then dp -= 1
            when ','
                mem[dp] = input.charCodeAt input_c
                input_c += 1
            when '.'
                mem[dp] = 0 unless mem[dp]?
                output += String.fromCharCode mem[dp]
            when '['
                mem[dp] = 0 unless mem[dp]?
                if mem[dp] is 0
                    ip = brainloop ip, text
            when ']'
                mem[dp] = 0 unless mem[dp]?
                unless mem[dp] is 0
                    ip = brainloop ip, text
            when '+'
                mem[dp] = 0 unless mem[dp]?
                mem[dp] += 1
            when '-'
                mem[dp] = 1 unless mem[dp]?
                mem[dp] -= 1

        ip += 1

    output

window.runBrainfuck = () ->
    text   = document.querySelector("textarea#input").value
    input  = document.querySelector("textarea#stdin").value
    output = runText text, input
    document.querySelector("p#output").innerText = output
