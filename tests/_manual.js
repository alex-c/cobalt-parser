const {CompilerError} = require('../errors');
const Lexer = require('../lexer');

var lexer = new Lexer();

var identifiers = ["abc", "_abc", "a12a", "_a12a", "3_a", "2", "a 9a", "a_3_3_a"];

console.log("\nIdentifer validation:");
for (var i = 0; i < identifiers.length; i++) {
    var identifier = identifiers[i];
    if (lexer.isValidIdentifier(identifier)) {
        console.log(` + '${identifier}' is a valid identifier.`);
    } else {
        console.log(` - '${identifier}' is not a valid identifier.`);
    }
}

console.log("\n-----\n");

console.log("Test findNext():");
try {
    lexer.findNext("abc", 0, [])
} catch (error) {
    if (error instanceof CompilerError) {
        console.log(" + PASS");
    } else {
        console.log(" - FAIL")
    }
}
try {
    lexer.findNext("abc", 3, [])
} catch (error) {
    if (error instanceof CompilerError) {
        console.log(" + PASS");
    } else {
        console.log(" - FAIL")
    }
}
if (lexer.findNext("012345 3-2+sdä#", 0, lexer.delimiters) == 6) {
    console.log(" + PASS");
} else {
    console.log(" - FAIL")
}
if (lexer.findNext("012345 3-2+sdä#", 7, lexer.delimiters) == 8) {
    console.log(" + PASS");
} else {
    console.log(" - FAIL")
}

console.log("\n-----\n");

function printTokens(tokens) {
    var result = "";
    for (var i = 0; i < tokens.length; i++) {
        result += "(" + tokens[i].type;
        if (tokens[i].value) {
            result += ":" + tokens[i].value;
        }
        result += ")";
    }
    return result;
}

console.log("\nTokenization:");
var snippets = ["def x:int = 3+4;"];
for (var i = 0; i < snippets.length; i++) {
    var snippet = snippets[i];
    console.log(" $[" + snippet + "] > " + printTokens(lexer.tokenize(snippet)));
}
