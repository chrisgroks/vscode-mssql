/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IConnectionProfile } from "../interfaces";

/**
 * Interface representing a group of database connections
 */
export interface IConnectionGroup {
    /**
     * The unique identifier for the group
     */
    id: string;

    /**
     * The display name of the group
     */
    name: string;

    /**
     * Optional description of the group
     */
    description?: string;

    /**
     * Color used to identify the group visually (hex format: #RRGGBB)
     */
    color?: string;

    /**
     * The connections that belong to this group
     */
    connections: IConnectionProfile[];

    /**
     * Order for display in the tree (lower numbers appear first)
     */
    displayOrder?: number;
}
