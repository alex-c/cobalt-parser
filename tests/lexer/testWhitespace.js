const test = require('tape');

//Lexer to use in whitespace tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test that whitespace is being correctly ignored
const testWhitespace = test('CobaltLexer.tokenize: whitespace', function(assert) {

    const computedTokens = lexer.tokenize('  \t\t \t  ; \t    \t');
    const expectedTokens = [
        {line: 1, type: 'semicolon'}
    ];

    assert.deepEqual(computedTokens, expectedTokens, "Whitespace ignored.");

    assert.end();

});

module.exports = testWhitespace;
