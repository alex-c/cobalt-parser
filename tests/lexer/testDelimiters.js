const test = require('tape');

//Lexer to use in delimiter tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test tokenization of various delimiters
const testDelimiters = test('CobaltLexer.tokenize: other delimiters', function(assert) {

    let computedTokens, expectedTokens;

    //Case: type operator
    computedTokens = lexer.tokenize(':');
    expectedTokens = [
        {line: 1, type: 'colon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type setting operator ':'.");

    //Case: semicolon
    computedTokens = lexer.tokenize(';');
    expectedTokens = [
        {line: 1, type: 'semicolon'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Semicolon.");

    //Case: parentheses
    computedTokens = lexer.tokenize('()(');
    expectedTokens = [
        {line: 1, type: 'lparen'},
        {line: 1, type: 'rparen'},
        {line: 1, type: 'lparen'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Parantheses.");

    assert.end();

});

module.exports = testDelimiters;
