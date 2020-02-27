/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
const vscode_languageserver_types_1 = require('vscode-languageserver-types');
exports.TextDocument = vscode_languageserver_types_1.TextDocument;
exports.Position = vscode_languageserver_types_1.Position;
exports.CompletionItem = vscode_languageserver_types_1.CompletionItem;
exports.CompletionList = vscode_languageserver_types_1.CompletionList;
exports.Range = vscode_languageserver_types_1.Range;
exports.SymbolInformation = vscode_languageserver_types_1.SymbolInformation;
exports.Diagnostic = vscode_languageserver_types_1.Diagnostic;
exports.TextEdit = vscode_languageserver_types_1.TextEdit;
exports.FormattingOptions = vscode_languageserver_types_1.FormattingOptions;
exports.MarkedString = vscode_languageserver_types_1.MarkedString;
const jsonCompletion_1 = require('./services/jsonCompletion');
const jsonHover_1 = require('./services/jsonHover');
const jsonValidation_1 = require('./services/jsonValidation');
const jsonSchema_1 = require('./jsonSchema');
exports.JSONSchema = jsonSchema_1.JSONSchema;
const jsonDocumentSymbols_1 = require('./services/jsonDocumentSymbols');
const jsonParser_1 = require('./parser/jsonParser');
const configuration_1 = require('./services/configuration');
const jsonSchemaService_1 = require('./services/jsonSchemaService');
const jsonContributions_1 = require('./jsonContributions');
exports.JSONWorkerContribution = jsonContributions_1.JSONWorkerContribution;
exports.JSONPath = jsonContributions_1.JSONPath;
exports.Segment = jsonContributions_1.Segment;
exports.CompletionsCollector = jsonContributions_1.CompletionsCollector;
const jsonFormatter_1 = require('./services/jsonFormatter');
function getLanguageService(params) {
    let promise = params.promiseConstructor || Promise;
    let jsonSchemaService = new jsonSchemaService_1.JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
    jsonSchemaService.setSchemaContributions(configuration_1.schemaContributions);
    let jsonCompletion = new jsonCompletion_1.JSONCompletion(jsonSchemaService, params.contributions, promise);
    let jsonHover = new jsonHover_1.JSONHover(jsonSchemaService, params.contributions, promise);
    let jsonDocumentSymbols = new jsonDocumentSymbols_1.JSONDocumentSymbols();
    let jsonValidation = new jsonValidation_1.JSONValidation(jsonSchemaService, promise);
    let disallowComments = false;
    return {
        configure: (settings) => {
            jsonSchemaService.clearExternalSchemas();
            if (settings.schemas) {
                settings.schemas.forEach(settings => {
                    jsonSchemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
                });
            }
            ;
            jsonValidation.configure(settings);
            disallowComments = settings && !settings.allowComments;
        },
        resetSchema: (uri) => jsonSchemaService.onResourceChange(uri),
        doValidation: jsonValidation.doValidation.bind(jsonValidation),
        parseJSONDocument: (document) => jsonParser_1.parse(document.getText(), { disallowComments }),
        doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
        doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
        findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
        doHover: jsonHover.doHover.bind(jsonHover),
        format: jsonFormatter_1.format
    };
}
exports.getLanguageService = getLanguageService;
//# sourceMappingURL=tomlService.js.map