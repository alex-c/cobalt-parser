const test = require('tape');

//Lexer to use in special keyword tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Tests special keywords
var testKeywords = test('CobaltLexer.tokenize: special multi-char keywords', function(assert) {

    let computedTokens, expectedTokens;

    //Case: standard input
    computedTokens = lexer.tokenize('stdin ');
    expectedTokens = [
        {line: 1, type: 'input'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Standard input 'stdin' keyword.");

    //Case: standard output
    computedTokens = lexer.tokenize('stdout ');
    expectedTokens = [
        {line: 1, type: 'output'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Standard output 'stdout' keyword.");

    //Case: output
    computedTokens = lexer.tokenize('def ');
    expectedTokens = [
        {line: 1, type: 'declaration'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Declaration 'def' keyword.");

    assert.end();

});

module.exports = testKeywords;
