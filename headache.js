// Generated by CoffeeScript 2.7.0
(function() {
  /*
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
  */
  var brainloop, runText;

  brainloop = function(ip, text) {
    var char, forward, other, pad;
    char = text[ip];
    pad = 0;
    forward = char === ']' ? false : true;
    if (char === '[') {
      other = ']';
      ip += 1;
    } else {
      other = '[';
      ip -= 1;
    }
    while (true) {
      if (text[ip] == null) {
        alert("error on loops!");
        return void 0;
      }
      if (text[ip] === other && pad === 0) {
        return ip;
      }
      if (text[ip] === other && pad > 0) {
        pad -= 1;
      } else if (text[ip] === other && pad === 0) {
        return ip + 1;
      }
      if (text[ip] === char) {
        pad += 1;
      }
      if (forward) {
        ip += 1;
      } else {
        ip -= 1;
      }
    }
  };

  runText = function(text, input) {
    var dp, input_c, ip, mem, output;
    input_c = 0;
    output = "";
    mem = [];
    dp = 0;
    ip = 0;
    while (text[ip] != null) {
      switch (text[ip]) {
        case '>':
          dp += 1;
          break;
        case '<':
          dp -= 1;
          break;
        case ',':
          mem[dp] = input.charCodeAt(input_c);
          input_c += 1;
          break;
        case '.':
          if (mem[dp] == null) {
            mem[dp] = 0;
          }
          output += String.fromCharCode(mem[dp]);
          break;
        case '[':
          if (mem[dp] == null) {
            mem[dp] = 0;
          }
          if (mem[dp] === 0) {
            ip = brainloop(ip, text);
          }
          break;
        case ']':
          if (mem[dp] == null) {
            mem[dp] = 0;
          }
          if (mem[dp] !== 0) {
            ip = brainloop(ip, text);
          }
          break;
        case '+':
          if (mem[dp] == null) {
            mem[dp] = 0;
          }
          mem[dp] += 1;
          break;
        case '-':
          if (mem[dp] == null) {
            mem[dp] = 1;
          }
          mem[dp] -= 1;
      }
      ip += 1;
    }
    return output;
  };

  window.runBrainfuck = function() {
    var input, output, text;
    text = document.querySelector("textarea#input").value;
    input = document.querySelector("textarea#stdin").value;
    output = runText(text, input);
    return document.querySelector("p#output").innerText = output;
  };

}).call(this);