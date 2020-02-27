'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class MatlabDocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
        const _functionPattern = /^\s*function /;
        const result = [];
        for (let line = 0; line < document.lineCount; line++) {
            const { text } = document.lineAt(line);
            if (!text.startsWith("%") && _functionPattern.test(text)) {
                result.push(new vscode.SymbolInformation(text.trim(), vscode.SymbolKind.Function, '', new vscode.Location(document.uri, new vscode.Range(line, 0, line, text.length - 1))));
            }
        }
        return result;
    }
}
exports.MatlabDocumentSymbolProvider = MatlabDocumentSymbolProvider;
//# sourceMappingURL=documentSymbolProvider.js.map