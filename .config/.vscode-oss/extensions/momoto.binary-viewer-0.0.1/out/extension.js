'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    class HTMLDocumentContentProvider {
        constructor() {
            this._onDidChange = new vscode.EventEmitter();
        }
        provideTextDocumentContent(uri) {
            if (vscode.window.activeTextEditor === undefined) {
                vscode.window.showErrorMessage('Cannot show hexdump because there is no active text editor.');
                return '';
            }
            let sourceText = vscode.window.activeTextEditor.document.getText();
            let hexadecimal = [];
            for (let i = 0; i < sourceText.length; i++) {
                if (sourceText[i].charCodeAt(0) > 255) {
                    let encoded = encodeURI(sourceText[i]);
                    let splited = encoded.split('%');
                    for (let c in splited) {
                        if (splited[c].length < 1) {
                            continue;
                        }
                        hexadecimal[hexadecimal.length] = ('00' + parseInt(splited[c], 16)
                            .toString(16)
                            .toLowerCase()).slice(-2);
                    }
                }
                else {
                    hexadecimal[hexadecimal.length] = ('00' + sourceText[i]
                        .charCodeAt(0)
                        .toString(16)
                        .toLowerCase()).slice(-2);
                }
            }
            let cells = hexadecimal.length + (16 - hexadecimal.length % 16);
            let dumpedHtml = '';
            for (let i = 0; i < cells; i = i + 2) {
                if (i % 16 === 0) {
                    dumpedHtml += '<tr><th>'
                        + ('00000000' + i.toString(16)).slice(-8)
                        + ':</th>';
                }
                dumpedHtml += '<td><code>'
                    + ((i + 0 < hexadecimal.length) ? hexadecimal[i + 0] : '&nbsp;')
                    + ((i + 1 < hexadecimal.length) ? hexadecimal[i + 1] : '&nbsp;')
                    + '</code></td>';
                if (i % 16 === 1) {
                    dumpedHtml += '</tr>';
                }
            }
            return '<table>' + dumpedHtml + '</table>';
        }
        get onDidChange() {
            return this._onDidChange.event;
        }
        update(uri) {
            this._onDidChange.fire(uri);
        }
    }
    let previewUri = vscode.Uri.parse('HTMLPreview://authority/preview');
    let htdocProvider = new HTMLDocumentContentProvider();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    let d1 = vscode.workspace.registerTextDocumentContentProvider('HTMLPreview', htdocProvider);
    let d2 = vscode.commands.registerCommand('extension.dumpBinary', () => {
        if (vscode.window.activeTextEditor === undefined) {
            vscode.window.showErrorMessage('Cannot show hexdump because there is no active text editor.');
            return;
        }
        let e = vscode.window.activeTextEditor;
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, e.viewColumn ? e.viewColumn + 1 : e.viewColumn, `Hexdump of ${path.basename(e.document.fileName)}`).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });
    let d3 = vscode.workspace.onDidChangeTextDocument((e) => {
        if (vscode.window.activeTextEditor !== undefined
            && e.document === vscode.window.activeTextEditor.document) {
            htdocProvider.update(previewUri);
        }
    });
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(d1, d2, d3);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map