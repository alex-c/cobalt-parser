const test = require('tape');

//Lexer to use in utilities tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test findNext utility method
const testLexerUtilities = test('CobaltLexer.findNext', function(assert) {

    let position;

    //Find next EOL
    position = lexer.findNext('line1\rline2\rline3 ', 6, ['\r', '\n']);
    assert.equal(position, 11, "Find next EOL.");

    //Find word ends
    position = lexer.findNext('hello ', 0, lexer.delimiters);
    assert.equal(position, 5, "Find word end with delimiter ' '.");
    position = lexer.findNext('hello\r', 0, lexer.delimiters);
    assert.equal(position, 5, "Find word end with EOL delimiter '\\r'.");
    position = lexer.findNext('hello\n', 0, lexer.delimiters);
    assert.equal(position, 5, "Find word end with EOL delimiter '\\n'.");
    position = lexer.findNext('hello;', 0, lexer.delimiters);
    assert.equal(position, 5, "Find word end with delimiter ';'.");
    position = lexer.findNext('helloworld:', 0, lexer.delimiters);
    assert.equal(position, 10, "Find word end with delimiter ':'.");
    position = lexer.findNext('helloworld\t', 0, lexer.delimiters);
    assert.equal(position, 10, "Find word end with tab delimiter.");
    position = lexer.findNext('helloworld(', 0, lexer.delimiters);
    assert.equal(position, 10, "Find word end with delimiter '('.");
    position = lexer.findNext('helloworld)', 0, lexer.delimiters);
    assert.equal(position, 10, "Find word end with delimiter ')'.");

    //Not tested here: operators

    assert.end();

});

module.exports = testLexerUtilities;
