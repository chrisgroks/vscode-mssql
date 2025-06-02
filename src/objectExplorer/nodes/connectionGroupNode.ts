/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import { TreeNodeInfo } from "./treeNodeInfo";
import { IConnectionGroup } from "../../models/interfaces/connectionGroup";
import { IConnectionProfile } from "../../models/interfaces";

/**
 * Node representing a group of connections in the object explorer tree
 */
export class ConnectionGroupNode extends TreeNodeInfo {
    private _group: IConnectionGroup;

    constructor(group: IConnectionGroup) {
        // Pass empty connection profile since this is a group node
        super(
            group.name,
            {
                type: "connectionGroup",
                subType: "group",
                filterable: false,
                hasFilters: false,
            },
            vscode.TreeItemCollapsibleState.Expanded,
            "connectionGroup",
            "group",
            "connectionGroup",
            "", // No session ID for groups
            {} as IConnectionProfile, // Empty connection profile
            undefined, // No parent node for groups
            [], // No filter properties
            "group",
        );

        this._group = group;

        // Set the group color if specified
        if (group.color) {
            // Set icon tint color when supported
            // this.iconPath = new vscode.ThemeIcon('server', new vscode.ThemeColor(group.color));
        }

        if (group.description) {
            this.tooltip = group.description;
        }
    }

    /**
     * Get the connection group details
     */
    public get group(): IConnectionGroup {
        return this._group;
    }
}
