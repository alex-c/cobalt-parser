const {CompilerError, CobaltSyntaxError} = require('./errors');

/**
*   <p>A lexer for the Cobalt programming language.</p>
*/
function CobaltLexer() {

    //A list of keywords that can delimit a word (identifier, literal or keyword).
    this.delimiters = [' ','\t','\n','\r',':',';','&','|','!','+','-','*','/','~','=','>','<','(',')'];

    //A validator for identifiers
    this.identifierValidator = /^[a-z,A-Z]+\w*$/;

}

/**
*   <p>Tokenizes a string of Cobalt code.</p>
*
*   @param {String} code    String of Cobalt code.
*   @return {Array}         Token list.
*   @throws {CobaltSyntaxError}
*/
CobaltLexer.prototype.tokenize = function(code) {

    //Set up
    let tokens = [];
    let position = 0;
    let line = 1;
    let firstChar;

    //Tokenize
    while(position < code.length) {
        firstChar = code.charAt(position);
        if (firstChar == ' ' || firstChar == '\t') {
            position++;
        } else if (firstChar == '\n' || firstChar == '\r') {
            line++;
            position++;
            if (firstChar == '\r' && code.charAt(position) == '\n') {
                position++;
            }
        } else if (firstChar == ':') {
            tokens.push({type: 'colon', line: line});
            position++;
        } else if (firstChar == ';') {
            tokens.push({type: 'semicolon', line: line});
            position++;
        } else if (firstChar == '&') {
            tokens.push({type: 'and', line: line});
            position++;
        } else if (firstChar == '|') {
            tokens.push({type: 'or', line: line});
            position++;
        } else if (firstChar == '!') {
            tokens.push({type: 'not', line: line});
            position++;
        } else if (firstChar == '=') {
            tokens.push({type: 'equal', line: line});
            position++;
        } else if (firstChar == '>') {
            tokens.push({type: 'greater', line: line});
            position++;
        } else if (firstChar == '<') {
            tokens.push({type: 'less', line: line});
            position++;
        } else if (firstChar == '+') {
            tokens.push({type: 'plus', line: line});
            position++;
        } else if (firstChar == '-') {
            tokens.push({type: 'minus', line: line});
            position++;
        } else if (firstChar == '*') {
            tokens.push({type: 'multiply', line: line});
            position++;
        } else if (firstChar == '/') {
            if (code.charAt(position + 1) == '/') {
                position = this.findNext(code, position, ['\n','\r']);
            } else {
                tokens.push({type: 'divide', line: line});
                position++;
            }
        } else if (firstChar == '~') {
            tokens.push({type: 'tilde', line: line});
            position++;
        } else if (firstChar == '(') {
            tokens.push({type: 'lparen', line: line});
            position++;
        } else if (firstChar == ')') {
            tokens.push({type: 'rparen', line: line});
            position++;
        } else {
            //Possible tokens left: literal, identifier, multi-letter keyword
            let wordLimit = this.findNext(code, position, this.delimiters);
            if (wordLimit > 0) {
                let word = code.substring(position, wordLimit);
                if (word == 'def') {
                    tokens.push({type: 'declaration', line: line});
                } else if (word == 'print') {
                    tokens.push({type: 'output', line: line});
                } else if (word == 'int') {
                    tokens.push({type: 'type', subtype: 'int', line: line});
                } else if (word == 'bool') {
                    tokens.push({type: 'type', subtype: 'bool', line: line});
                } else if (word == 'true') {
                    tokens.push({type: 'literal', subtype: 'bool', value: 'true', line: line});
                } else if (word == 'false') {
                    tokens.push({type: 'literal', subtype: 'bool', value: 'false', line: line});
                } else if (!isNaN(word)) {
                    if (word.indexOf('.') == -1) {
                        tokens.push({type: 'literal', subtype: 'int', value: word, line: line});
                    } else {
                        throw new CobaltSyntaxError(line, "Unexpected dot (.). Note that this version of Cobalt does not support floating point numbers.");
                    }
                } else {
                    if (this.isValidIdentifier(word)) {
                        tokens.push({type: 'identifier', value: word, line: line});
                    } else {
                        throw new CobaltSyntaxError(line, "Invalid syntax. Expected identifier.");
                    }
                }
                position += word.length;
            } else {
                throw new CobaltSyntaxError(line, "Unable to find word end. Check wether you are missing a semicolon (;).");
            }
        }
    }

    //Tokenization successful - return token list
    return(tokens);
}

/**
*   <p>Checks an identifier for validity.</p>
*
*   @param {String} word    The word to check.
*   @return {Boolean}       Returns whether the identifier is valid.
*/
CobaltLexer.prototype.isValidIdentifier = function(word) {

    return this.identifierValidator.test(word);

}

/**
*   <p>Finds the next occurence of one of a set of strings in Cobalt code.</p>
*   <p>Examples:<br />
*   - Find end of line: var eol = findNext(code, offset, ['\n','\r']);<br />
*   - Find end of word: var wordLimit = findNext(code, offset, delimiters);</p>
*
*   @private
*   @param {String} code      The Cobalt code in which to look.
*   @param {Number} offset    The offset at which to start.
*   @param {Array} tokens     List of strings to look for.
*   @return {Number}          Position of the first matching token. -1 if none found.
*   @throws {CompilerError}
*/
CobaltLexer.prototype.findNext = function(code, offset, tokens) {

    //Check for tokens argument validity
    if (tokens.length == 0) {
        throw new CompilerError("Empty token list passed.","Lexer","findNext");
    }

    //Check for offset argument validity
    if (offset >= code.length) {
        throw new CompilerError("Offset greater/equal then input code length.","Lexer","findNext");
    }

    //Consider only tokens present in the code
    let relevantTokens = tokens.filter(token => code.substring(offset, code.length).includes(token));

    //Return -1 if none of the tokens is present in the code
    if (relevantTokens.length == 0) {
        return -1
    }

    //Get position of the first occurence of the token in the code
    let positions = relevantTokens.map(token => code.indexOf(token, offset));

    //Returns the earliest occurence of any token present in the code
    return Math.min(...positions);

};

module.exports = CobaltLexer;
