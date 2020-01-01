'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const matlabDiagnostics_1 = require("./matlabDiagnostics");
const vscode_1 = require("vscode");
const documentSymbolProvider_1 = require("./documentSymbolProvider");
var canLint = true;
let diagnosticCollection;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log("Activating extension Matlab");
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: 'matlab', scheme: 'file' }, new documentSymbolProvider_1.MatlabDocumentSymbolProvider()));
    var matlabConfig = vscode_1.workspace.getConfiguration('matlab');
    if (!matlabConfig['lintOnSave']) {
        return;
    }
    if (!matlabConfig.has('mlintpath') || matlabConfig['mlintpath'] == null) {
        vscode_1.window.showErrorMessage("Could not find path to the mlint executable in the configuration file.");
        return;
    }
    var mlintPath = matlabConfig['mlintpath'];
    if (!fs.existsSync(mlintPath)) {
        vscode_1.window.showErrorMessage("Cannot find mlint at the given path, please check your configuration file.");
        return;
    }
    diagnosticCollection = vscode.languages.createDiagnosticCollection("matlab");
    context.subscriptions.push(diagnosticCollection);
    context.subscriptions.push(vscode_1.workspace.onDidSaveTextDocument(document => { lintDocument(document, mlintPath); }));
    context.subscriptions.push(vscode_1.workspace.onDidOpenTextDocument(document => { lintDocument(document, mlintPath); }));
    // Run mlint on any open documents since our onDidOpenTextDocument callback won't be hit for those
    vscode_1.workspace.textDocuments.forEach(document => lintDocument(document, mlintPath));
}
exports.activate = activate;
function lintDocument(document, mlintPath) {
    function mapSeverityToVSCodeSeverity(sev) {
        switch (sev) {
            case "error": return vscode.DiagnosticSeverity.Error;
            case "warning": return vscode.DiagnosticSeverity.Warning;
            default: return vscode.DiagnosticSeverity.Error;
        }
    }
    if (document.languageId != "matlab" || document.uri.scheme != "file") {
        return;
    }
    let matlabConfig = vscode.workspace.getConfiguration('matlab');
    matlabDiagnostics_1.check(document, matlabConfig['lintOnSave'], mlintPath).then(errors => {
        diagnosticCollection.delete(document.uri);
        let diagnosticMap = new Map();
        ;
        errors.forEach(error => {
            let targetUri = vscode.Uri.file(error.file);
            var line = error.line - 1;
            if (line < 0)
                line = 0;
            var startColumn = error.column[0] - 1;
            if (startColumn < 0)
                startColumn = 0;
            var endColumn = error.column[1];
            let range = new vscode.Range(line, startColumn, line, endColumn);
            let diagnostic = new vscode.Diagnostic(range, error.msg, mapSeverityToVSCodeSeverity(error.severity));
            let diagnostics = diagnosticMap.get(targetUri);
            if (!diagnostics) {
                diagnostics = [];
            }
            diagnostics.push(diagnostic);
            diagnosticMap.set(targetUri, diagnostics);
        });
        let entries = [];
        diagnosticMap.forEach((diags, uri) => {
            entries.push([uri, diags]);
        });
        diagnosticCollection.set(entries);
    }).catch(err => {
        vscode.window.showErrorMessage(err);
    });
}
//# sourceMappingURL=matlabMain.js.map