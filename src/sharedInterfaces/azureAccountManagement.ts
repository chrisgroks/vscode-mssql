/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// Define types for state and reducers
export interface AzureAccountManagementState {
    message: string;
}

export interface AzureAccountManagementReducers {
    closeDialog: () => void;
}
