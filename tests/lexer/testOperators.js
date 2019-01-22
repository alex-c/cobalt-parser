const test = require('tape');

//Lexer to use in operator tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test operators lexing
const testOperators = test('CobaltLexer.tokenize: operators', function(assert) {

    let computedTokens, expectedTokens;

    //Case: logical operators
    computedTokens = lexer.tokenize('&|!');
    expectedTokens = [
        {line: 1, type: 'and'},
        {line: 1, type: 'or'},
        {line: 1, type: 'not'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Logical operators.");

    //Case: comparison operators
    computedTokens = lexer.tokenize('=<>');
    expectedTokens = [
        {line: 1, type: 'equal'},
        {line: 1, type: 'less'},
        {line: 1, type: 'greater'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Comparison operators.");

    //Case: arithmetic operators
    computedTokens = lexer.tokenize('+-*/');
    expectedTokens = [
        {line: 1, type: 'plus'},
        {line: 1, type: 'minus'},
        {line: 1, type: 'multiply'},
        {line: 1, type: 'divide'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Arithmetic operators.");

    //Case: minus sign
    computedTokens = lexer.tokenize('~');
    expectedTokens = [
        {line: 1, type: 'tilde'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Minus sign '~'.");

    assert.end();

});

module.exports = testOperators;
