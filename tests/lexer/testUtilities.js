const test = require('tape');

const CobaltLexer = require('../../CobaltLexer');

var lexer = new CobaltLexer();

var testIdentifierValidation = test('CobaltLexer.isValidIdentifier', function(assert) {

    var identifiers = [];
    identifiers.push(identifierTest("abc", true));
    identifiers.push(identifierTest("abc1", true));
    identifiers.push(identifierTest("abc2abc", true));
    identifiers.push(identifierTest("abc_", true));
    identifiers.push(identifierTest("abc_1", true));
    identifiers.push(identifierTest("abc_a", true));
    identifiers.push(identifierTest("abc3abc_def1990", true));
    identifiers.push(identifierTest("_abc", false));
    identifiers.push(identifierTest("_123abc", false));
    identifiers.push(identifierTest("_123", false));
    identifiers.push(identifierTest("1abc", false));
    identifiers.push(identifierTest("123abc", false));
    identifiers.push(identifierTest("123_abc", false));

    for (var i = 0; i < identifiers.length; i++) {
        assert.equal(
            lexer.isValidIdentifier(identifiers[i].identifier),
            identifiers[i].testShouldPass,
            "'" + identifiers[i].identifier + "'' is " + (identifiers[i].testShouldPass ? "" : "not ") + "a valid identifier."
        );
    }

    assert.end();

});

function identifierTest(identifier, testShouldPass) {
    return {identifier,testShouldPass};
}
