/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import * as LocalizedConstants from "../../constants/locConstants";
import { ConnectableTreeNodeInfo } from "./treeNodeInfo";
import { ObjectExplorerUtils } from "../objectExplorerUtils";

export class ExpandErrorNode extends vscode.TreeItem {
    constructor(
        private _parentNode: ConnectableTreeNodeInfo,
        errorMessage: string,
    ) {
        super(
            LocalizedConstants.ObjectExplorer.ErrorLoadingRefreshToTryAgain,
            vscode.TreeItemCollapsibleState.None,
        );
        this.tooltip = errorMessage;
        this.iconPath = {
            light: ObjectExplorerUtils.iconPath("Error_light"),
            dark: ObjectExplorerUtils.iconPath("Error_dark"),
        };
    }

    public get parentNode(): ConnectableTreeNodeInfo {
        return this._parentNode;
    }
}
