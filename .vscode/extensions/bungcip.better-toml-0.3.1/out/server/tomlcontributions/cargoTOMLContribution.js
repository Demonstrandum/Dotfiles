/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
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
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle();
const FEED_INDEX_URL = 'https://api.nuget.org/v3/index.json';
const LIMIT = 30;
const RESOLVE_ID = 'CargoTOMLContribution-';
const CACHE_EXPIRY = 1000 * 60 * 5; // 5 minutes
class CargoTOMLContribution {
    constructor() {
        console.log("CargoTOMLContribution: constructor() called");
    }
    getInfoContribution(uri, location) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    collectPropertyCompletions(uri, location, currentWord, addValue, isLast, result) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    collectValueCompletions(uri, location, propertyKey, result) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    collectDefaultCompletions(uri, result) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    resolveCompletion(item) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("resolveCompletion(): called");
            return {
                label: "example"
            };
        });
    }
}
exports.CargoTOMLContribution = CargoTOMLContribution;
// /**
//  * The label of this completion item. By default
//  * also the text that is inserted when selecting
//  * this completion.
//  */
// label: string;
// /**
//  * The kind of this completion item. Based of the kind
//  * an icon is chosen by the editor.
//  */
// kind?: number;
// /**
//  * A human-readable string with additional information
//  * about this item, like type or symbol information.
//  */
// detail?: string;
// /**
//  * A human-readable string that represents a doc-comment.
//  */
// documentation?: string;
// /**
//  * A string that shoud be used when comparing this item
//  * with other items. When `falsy` the [label](#CompletionItem.label)
//  * is used.
//  */
// sortText?: string;
// /**
//  * A string that should be used when filtering a set of
//  * completion items. When `falsy` the [label](#CompletionItem.label)
//  * is used.
//  */
// filterText?: string;
// /**
//  * A string that should be inserted a document when selecting
//  * this completion. When `falsy` the [label](#CompletionItem.label)
//  * is used.
//  */
// insertText?: string;
// /**
//  * An [edit](#TextEdit) which is applied to a document when selecting
//  * this completion. When an edit is provided the value of
//  * [insertText](#CompletionItem.insertText) is ignored.
//  */
// textEdit?: TextEdit;
// /**
//  * An optional array of additional [text edits](#TextEdit) that are applied when
//  * selecting this completion. Edits must not overlap with the main [edit](#CompletionItem.textEdit)
//  * nor with themselves.
//  */
// additionalTextEdits?: TextEdit[];
// /**
//  * An optional [command](#Command) that is executed *after* inserting this completion. *Note* that
//  * additional modifications to the current document should be described with the
//  * [additionalTextEdits](#CompletionItem.additionalTextEdits)-property.
//  */
// command?: Command;
// /**
//  * An data entry field that is preserved on a completion item between
//  * a [CompletionRequest](#CompletionRequest) and a [CompletionResolveRequest]
//  * (#CompletionResolveRequest)
//  */
// data?: any;
function matches(segments, pattern) {
    let k = 0;
    for (let i = 0; k < pattern.length && i < segments.length; i++) {
        if (pattern[k] === segments[i] || pattern[k] === '*') {
            k++;
        }
        else if (pattern[k] !== '**') {
            return false;
        }
    }
    return k === pattern.length;
}
//# sourceMappingURL=cargoTOMLContribution.js.map