'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let scrDownDispose = vscode.commands.registerCommand('extension.smoothscroll_scrollDown', () => {
        main(() => { vscode.commands.executeCommand('scrollLineDown'); });
    });
    let scrUpDispose = vscode.commands.registerCommand('extension.smoothscroll_scrollUp', () => {
        main(() => { vscode.commands.executeCommand('scrollLineUp'); });
    });
    let curDownDispose = vscode.commands.registerCommand('extension.smoothscroll_cursorDown', () => {
        main(() => { vscode.commands.executeCommand('cursorDown'); });
    });
    let curUpDispose = vscode.commands.registerCommand('extension.smoothscroll_cursorUp', () => {
        main(() => { vscode.commands.executeCommand('cursorUp'); });
    });
    let selDownDispose = vscode.commands.registerCommand('extension.smoothscroll_selectionDown', () => {
        main(() => { vscode.commands.executeCommand('cursorDownSelect'); });
    });
    let selUpDispose = vscode.commands.registerCommand('extension.smoothscroll_selectionUp', () => {
        main(() => { vscode.commands.executeCommand('cursorUpSelect'); });
    });
    let scrCenter = vscode.commands.registerCommand('extension.smoothscroll_scrollCenter', () => {
        vscode.window.activeTextEditor.revealRange(vscode.window.activeTextEditor.selection, vscode.TextEditorRevealType.InCenter);
    });
    context.subscriptions.push(curDownDispose);
    context.subscriptions.push(curUpDispose);
    context.subscriptions.push(scrDownDispose);
    context.subscriptions.push(scrUpDispose);
    context.subscriptions.push(selUpDispose);
    context.subscriptions.push(selDownDispose);
}
exports.activate = activate;
function main(call) {
    return __awaiter(this, void 0, void 0, function* () {
        yield scroll(call);
    });
}
function scroll(call) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("This happens!");
        var linesToScroll = vscode.workspace.getConfiguration('extension.smoothscroll').get('linesToScroll');
        var totalDelay = vscode.workspace.getConfiguration('extension.smoothscroll').get('totalDelay');
        // future impl : var usePercent     : boolean = vscode.workspace.getConfiguration('extension.smoothscroll').get<boolean>('usePercent');
        var calculatedDelay = totalDelay / linesToScroll;
        for (var i = 0; i < linesToScroll; i++) {
            call();
            yield delay(calculatedDelay);
        }
    });
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map