/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode-mssql' {
    /**
     * ResultStatus from d.ts
     */
    export interface ResultStatus {
        success: boolean;
        errorMessage: string;
    }
}