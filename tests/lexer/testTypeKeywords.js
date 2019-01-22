const test = require('tape');

//Lexer to use in type keyword tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

const testTypes = test('CobaltLexer.tokenize: type keywords', function(assert) {

    let computedTokens, expectedTokens;

    //Case: bool
    computedTokens = lexer.tokenize('bool ');
    expectedTokens = [
        {line: 1, type: 'type', subtype: 'bool'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type keyword 'bool'.");

    //Case: int
    computedTokens = lexer.tokenize('int ');
    expectedTokens = [
        {line: 1, type: 'type', subtype: 'int'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type keyword 'int'.");

    //Case: float
    computedTokens = lexer.tokenize('float ');
    expectedTokens = [
        {line: 1, type: 'type', subtype: 'float'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Type keyword 'float'.");

    assert.end();

});

module.exports = testTypes;
