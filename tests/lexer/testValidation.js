const test = require('tape');

//Lexer to use in validation tests
const CobaltLexer = require('../../CobaltLexer');
const lexer = new CobaltLexer();

//Test identifier validation
const testIdentifierValidation = test('CobaltLexer.isValidIdentifier', function(assert) {

    const testData = [];
    testData.push(newTestData("abc", true));
    testData.push(newTestData("abc1", true));
    testData.push(newTestData("abc2abc", true));
    testData.push(newTestData("abc_", true));
    testData.push(newTestData("abc_1", true));
    testData.push(newTestData("abc_a", true));
    testData.push(newTestData("abc3abc_def1990", true));
    testData.push(newTestData("_abc", false));
    testData.push(newTestData("_123abc", false));
    testData.push(newTestData("_123", false));
    testData.push(newTestData("1abc", false));
    testData.push(newTestData("123abc", false));
    testData.push(newTestData("123_abc", false));

    for (let i = 0; i < testData.length; i++) {
        assert.equal(
            lexer.isValidIdentifier(testData[i].value),
            testData[i].testShouldPass,
            "'" + testData[i].value + "' is " + (testData[i].testShouldPass ? "" : "not ") + "a valid identifier."
        );
    }

    assert.end();

});

//Test integer validation
const testIntegerValidation = test('CobaltLexer.isValidInteger', function(assert) {

    const testData = [];
    testData.push(newTestData("10237", true));
    testData.push(newTestData("123", true));
    testData.push(newTestData("7", true));
    testData.push(newTestData("", false));
    testData.push(newTestData(" 123", false));
    testData.push(newTestData("123 ", false));
    testData.push(newTestData("121.12", false));
    testData.push(newTestData(".23", false));
    testData.push(newTestData("123.", false));
    testData.push(newTestData("1.1", false));
    testData.push(newTestData(".", false));
    testData.push(newTestData(" ", false));
    testData.push(newTestData("a", false));

    for (let i = 0; i < testData.length; i++) {
        assert.equal(
            lexer.isValidInteger(testData[i].value),
            testData[i].testShouldPass,
            "'" + testData[i].value + "' is " + (testData[i].testShouldPass ? "" : "not ") + "a valid integer."
        );
    }

    assert.end();

});

//Test floating point validation
const testFloatValidation = test('CobaltLexer.isValidFloat', function(assert) {

    const testData = [];
    testData.push(newTestData("1.1", true));
    testData.push(newTestData("123.234", true));
    testData.push(newTestData("123231.1", true));
    testData.push(newTestData("9.4350345", true));
    testData.push(newTestData("123", false));
    testData.push(newTestData("123.", false));
    testData.push(newTestData(".12", false));
    testData.push(newTestData(".", false));
    testData.push(newTestData("a", false));
    testData.push(newTestData(" ", false));
    testData.push(newTestData("", false));
    testData.push(newTestData("1230.asdas", false));
    testData.push(newTestData("b.0", false));

    for (let i = 0; i < testData.length; i++) {
        assert.equal(
            lexer.isValidFloat(testData[i].value),
            testData[i].testShouldPass,
            "'" + testData[i].value + "' is " + (testData[i].testShouldPass ? "" : "not ") + "a valid integer."
        );
    }

    assert.end();

});

//Local helper function
function newTestData(value, testShouldPass) {
    return {value, testShouldPass};
}
