/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TreeNodeInfo } from "../treeNodeInfo";
import * as Utils from "../../models/utils";
import { ObjectExplorerConstants } from "../objectExplorerConstants";

/**
 * Todo: This class should be updated with icons and helper methods when connection groups are implemented.
 */
export class ConnectionGroupNode extends TreeNodeInfo {
    constructor(groupName?: string, groupId?: string) {
        super(
            groupName,
            {
                filterable: false,
                hasFilters: false,
                type: ObjectExplorerConstants.connectionGroupNodeType,
                subType: undefined,
            },
            undefined,
            undefined,
            undefined,
            ObjectExplorerConstants.connectionGroupNodeType,
            undefined,
            undefined,
            undefined,
            undefined,
        );
        this.id = groupId ?? Utils.generateGuid();
    }
}
