const CobaltLexer = require('./lexer.js');
const {
    ProgramNode,
    CodeBlockNode,
    VariableDeclarationNode,
    AssignmentNode,
    OutputNode,
    ExpressionNode,
    BinaryExpressionNode,
    AdditionNode,
    SubstractionNode,
    MultiplicationNode,
    DivisionNode,
    ComparisonNode,
    LogicalAndNode,
    LogicalOrNode,
    UnaryExpressionNode,
    LogicalNegationNode,
    ArithmeticNegationNode,
    IdentifierNode,
    TypeNode,
    IntLiteralNode,
    BoolLiteralNode,
    ASTNode
} = require('./ast_nodes');

/**
*   <p>A parser for the Cobalt programming language.</p>
*/
function CobaltParser(logger) {

    this.logger = logger || console;

    this.lexer = new CobaltLexer();

    this.transformers = [];

}

CobaltParser.prototype.registerTransformer = function(namne, transformFunction) {

    this.transformers.push(new ASTTransformer(name, transformFunction));

}

/**
*   <p>Parses a Cobalt program in token form and builds an AST (abstract syntax tree).</p>
*   <p>A Cobalt program is handled as a code block whith an associated block scope, which constitutes the global program scope.</p>
*   <p>The AST getting returned, is an instance of {ProgramNode}, which contains a {CodeBlockNode} and possibly some meta-information. All AST nodes are instances of {ASTNode}.</p>
*   <p>The parser only builds the AST following the grammar rules given in EBNF form in the language specification. It does not perform type checking, nor does it populate symbol tables.</p>
*
*   @param {Array} tokens   The token list to parse.
*   @return {ProgramNode}   The AST representation of the Cobalt program.
*   @throws {CobaltSyntaxError}
*/
CobaltParser.prototype.parse = function(code) {

    //Tokenize Cobalt code
    let tokens = this.lexer.tokenize(code);

    //Parse tokens and generate AST
    let AST = this.parseProgram(tokens);

    //Apply optimization transformations
    this.optimize(AST);

    //Parsing and optimizing successful, return AST
    return(AST);

}

Cobalt.prototype.parseProgram = function(tokens) {

    //Set up AST root node
    let AST = new ProgramNode();

    //Parse the program
    let codeBlock = parseCodeBlock(tokens, 0, tokens.length);
    AST.setCode(codeBlock);

    //Parsing successful, return AST
    return AST;

}

Cobalt.prototype.optimize = function(AST) {

    for (let i = 0; i < this.transformers.length; i++) {
        AST.applyTransformation(this.transformers[i]);
    }

}

module.exports = CobaltParser;
