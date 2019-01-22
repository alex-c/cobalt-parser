const test = require('tape');

//Lexer to use in tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test that end of line comments are being ignored
const testComments = test('CobaltLexer.tokenize: comments', function(assert) {

    //Case: eol comments
    const computedTokens = lexer.tokenize('+//bla bla blabla.\n+');
    const expectedTokens = [
        {line: 1, type: 'plus'},
        {line: 2, type: 'plus'}
    ];

    assert.deepEqual(computedTokens, expectedTokens, "End-of-line comments ignored.");

    assert.end();

});

module.exports = testComments;
