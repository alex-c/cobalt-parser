var lexerTests = {
    testValidation: require('./testValidation'),
    testWhitespace: require('./testWhitespace'),
    testNewLines: require('./testNewLines'),
    testComments: require('./testComments'),
    testDelimiters: require('./testDelimiters'),
    testOperators: require('./testOperators'),
    testTypes: require('./testTypeKeywords'),
    testKeywords: require('./testSpecialKeywords'),
    testIdentifiers: require('./testIdentifiers'),
    testLiterals: require('./testLiterals'),
    testLexerUtilities: require('./testLexerUtilities')
}

module.exports = lexerTests;
