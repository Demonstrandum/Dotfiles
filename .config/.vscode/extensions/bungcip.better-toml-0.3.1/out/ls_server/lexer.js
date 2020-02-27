class Position {
}
var Token;
(function (Token) {
    Token[Token["Invalid"] = 0] = "Invalid";
    Token[Token["Number"] = 1] = "Number";
    Token[Token["LeftBracket"] = 2] = "LeftBracket";
    Token[Token["RightBracket"] = 3] = "RightBracket";
})(Token || (Token = {}));
class Lexer {
    new(input) {
        this.input = input;
        this.line = 1;
        this.column = 1;
        this.offset = 0;
        this.charCount = input.length;
    }
    next() {
        while (this.offset < this.charCount) {
            switch (this.input[this.offset]) {
                case '[':
            }
        }
        return Token.Invalid;
    }
    parseNumber(input) {
        var regex = /^[0-9][0-9_]+/;
        input.match(regex);
    }
}
//# sourceMappingURL=lexer.js.map