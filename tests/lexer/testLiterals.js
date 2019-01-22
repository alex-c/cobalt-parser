const test = require('tape');

//Lexer to use in literal tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Error objects
const {CobaltSyntaxError} = require('../../errors');

const testLiterals = test('CobaltLexer.tokenize: literals', function(assert) {

    let computedTokens, expectedTokens, fn;

    //Case: bool literals
    computedTokens = lexer.tokenize('true false ');
    expectedTokens = [
        {line: 1, type: 'literal', subtype:'bool', value: 'true'},
        {line: 1, type: 'literal', subtype:'bool', value: 'false'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Literals: valid bool literals.");

    //Case: int literals
    computedTokens = lexer.tokenize('12 98127 ');
    expectedTokens = [
        {line: 1, type: 'literal', subtype:'int', value: '12'},
        {line: 1, type: 'literal', subtype:'int', value: '98127'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Literals: valid int literals.");

    //Case: float literals
    computedTokens = lexer.tokenize('1.2 981.27 ');
    expectedTokens = [
        {line: 1, type: 'literal', subtype:'float', value: '1.2'},
        {line: 1, type: 'literal', subtype:'float', value: '981.27'}
    ];
    assert.deepEqual(computedTokens, expectedTokens, "Literals: valid float literals.");

    assert.end();

});

module.exports = testLiterals;
