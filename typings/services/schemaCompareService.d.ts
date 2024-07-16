/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode-mssql' {
	export interface ISchemaCompareService {
		schemaCompareGetDefaultOptions(): Thenable<SchemaCompareOptionsResult>;
	}

	export interface SchemaCompareGetOptionsParams { }

	export interface SchemaCompareOptionsResult extends ResultStatus {
		defaultDeploymentOptions: DeploymentOptions;
	}
}