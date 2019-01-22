const test = require('tape');

//Lexer to use in new line tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test new line parsing
const testNewLines = test('CobaltLexer.tokenize: new lines', function(assert) {

    let computedTokens, expectedTokens, fn;

    //Case: \n new lines
    computedTokens = lexer.tokenize('\n\n;\n');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];

    assert.deepEqual(computedTokens, expectedTokens, "\\n new lines recognized.");

    //Case: \r new lines
    computedTokens = lexer.tokenize('\r\r;\r');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];

    assert.deepEqual(computedTokens, expectedTokens, "\\r new lines recognized.");

    //Case: \r\n new lines
    computedTokens = lexer.tokenize('\r\n\r\n;\r\n');
    expectedTokens = [
        {line: 3, type: 'semicolon'}
    ];

    assert.deepEqual(computedTokens, expectedTokens, "\\r\\n new lines recognized.");

    assert.end();

});

module.exports = testNewLines;
