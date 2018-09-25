/**
*   <p>Base node object for all AST nodes.</p>
*
*   @param {Number} line The line from which the corresponding code is.
*   @param {String} type The node type.
*/
function ASTNode(line, type) {

    /** The source code line from which the corresponding code is. */
    this.line = line;

    /** The node type, for output. */
    this.type = type || "ASTNode";

    /** The parent node. */
    this.parentNode;

    /** Holds whether this node defines a scope. */
    this.definesScope = false;

    /** If the instanciated node defines a scope, the symbolTable field has to be set to a new {SymbolTable} instance. */
    this.symbolTable;

    //TODO: cache symbol names already defined for quicker lookups?
    this.symbolCache = [];

};

/**
*   <p>Se the node's parent in the AST.</p>
*
*   @param {ASTNode} node   The parent node.
*/
ASTNode.prototype.setParent = function(node) {

    this.parentNode = node;

};

ASTNode.prototype.lookUpSymbol = function(name) {

    if (this.definesScope && this.symbolTable.symbolIsDefined(name)) {
        return this.symbolTable[name]; //?
    } else if {
        this.
    } else if (this.parentNode) {
        return this.parentNode.lookUpSymbol(name);
    } else {
        return false; //?
    }
}

ASTNode.prototype.defineSymbol = function(name, type) {
    if(this.definesScope) {
        this.symbolTable.registerSymbol(name, type);
    } else if(this.parentNode) {
        this.parentNode.registerSymbol(name, type);
    } else {
        throw new CompilerError("Unable to find a scope defining node.", this.type, "registerSymbol");
    }
};

/**
*   Looks up the type associated with an identifier.
*
*   @param {String} name    The identifier.
*   @return {String}        The type.
*   @throws {CobaltError}   Throws this error, when an identifier has not been declared yet.
*   @throws {CompilerError}
*
ASTNode.prototype.lookUpSymbol = function (name) {
    if(this.definesScope) {
        if(this.symbolTable[name]) {
            return(this.symbolTable[name]);
        } else {
            throw new CobaltError("Variable "+name+" was not declared yet.");
        }
    } else if(this.parentNode) {
        return(this.parentNode.lookUpSymbol(name));
    } else {
        throw new CompilerError("Node has no parent node.", this.type, "lookUpSymbol");
    }
};*/

/**
*   <p>Returns node information as a string.</p>
*
*   @return {String} The info string.
*/
ASTNode.prototype.toString = function() {
    return("("+this.type+":"+this.line+")");
};

module.exports = ASTNode;
