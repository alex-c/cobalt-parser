const test = require('tape');

//Lexer to use in identifier tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Error objects
const {CobaltSyntaxError} = require('../../errors');

//Test identifier tokenization and parsing
const testIdentifiers = test('CobaltLexer.tokenize: identifiers', function(assert) {

    let computedTokens, expectedTokens, fn;

    //Case: letters only
    computedTokens = lexer.tokenize('abc ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'abc'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifier: letters only.");

    //Case: letters and numbers
    computedTokens = lexer.tokenize('var1 var123var ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'var1'},
        {line: 1, type: 'identifier', value: 'var123var'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifiers: letters and numbers.");

    //Case: letters, numbers and underlines
    computedTokens = lexer.tokenize('var_1 var_123_var_ ');
    expectedTokens = [
        {line: 1, type: 'identifier', value: 'var_1'},
        {line: 1, type: 'identifier', value: 'var_123_var_'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Identifiers: letters, numbers and underlines.");

    //Case: identifiers can't start with numbers
    fn = function() {
        lexer.tokenize('1var ');
    };
    assert.throws(fn, CobaltSyntaxError, "Identifier: cannot start with number.");

    //Case: identifiers can't start with underlines
    fn = function() {
        lexer.tokenize('_1var ');
    };
    assert.throws(fn, CobaltSyntaxError, "Identifier: cannot start with underline.");

    //Case: forbiden char
    fn = function() {
        lexer.tokenize('var%t ');
    };
    assert.throws(fn, CobaltSyntaxError, "Identifier: forbidden character.");

    assert.end();

});

module.exports = testIdentifiers;
