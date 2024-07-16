/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode-mssql' {
	export interface IDacFxService {
		exportBacpac(
			databaseName: string,
			packageFilePath: string,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode
		): Thenable<DacFxResult>;
		importBacpac(
			packageFilePath: string,
			databaseName: string,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode
		): Thenable<DacFxResult>;
		extractDacpac(
			databaseName: string,
			packageFilePath: string,
			applicationName: string,
			applicationVersion: string,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode
		): Thenable<DacFxResult>;
		createProjectFromDatabase(
			databaseName: string,
			targetFilePath: string,
			applicationName: string,
			applicationVersion: string,
			ownerUri: string,
			extractTarget: ExtractTarget,
			taskExecutionMode: TaskExecutionMode,
			includePermissions?: boolean
		): Thenable<DacFxResult>;
		deployDacpac(
			packageFilePath: string,
			databaseName: string,
			upgradeExisting: boolean,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode,
			sqlCommandVariableValues?: Map<string, string>,
			deploymentOptions?: DeploymentOptions
		): Thenable<DacFxResult>;
		generateDeployScript(
			packageFilePath: string,
			databaseName: string,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode,
			sqlCommandVariableValues?: Map<string, string>,
			deploymentOptions?: DeploymentOptions
		): Thenable<DacFxResult>;
		generateDeployPlan(
			packageFilePath: string,
			databaseName: string,
			ownerUri: string,
			taskExecutionMode: TaskExecutionMode
		): Thenable<GenerateDeployPlanResult>;
		getOptionsFromProfile(profilePath: string): Thenable<DacFxOptionsResult>;
		validateStreamingJob(
			packageFilePath: string,
			createStreamingJobTsql: string
		): Thenable<ValidateStreamingJobResult>;
		savePublishProfile(
			profilePath: string,
			databaseName: string,
			connectionString: string,
			sqlCommandVariableValues?: Map<string, string>,
			deploymentOptions?: DeploymentOptions
		): Thenable<ResultStatus>;
	}

	export const enum ExtractTarget {
		dacpac = 0,
		file = 1,
		flat = 2,
		objectType = 3,
		schema = 4,
		schemaObjectType = 5,
	}

	export const enum TaskExecutionMode {
		execute = 0,
		script = 1,
		executeAndScript = 2,
	}

	export interface DacFxResult extends ResultStatus {
		operationId: string;
	}

	export interface GenerateDeployPlanResult extends DacFxResult {
		report: string;
	}

	export interface DacFxOptionsResult extends ResultStatus {
		deploymentOptions: DeploymentOptions;
	}

	export interface ValidateStreamingJobResult extends ResultStatus { }

	export interface ExportParams {
		databaseName: string;
		packageFilePath: string;
		ownerUri: string;
		taskExecutionMode: TaskExecutionMode;
	}

	export interface ImportParams {
		packageFilePath: string;
		databaseName: string;
		ownerUri: string;
		taskExecutionMode: TaskExecutionMode;
	}

	export interface ExtractParams {
		databaseName: string;
		packageFilePath: string;
		applicationName: string;
		applicationVersion: string;
		ownerUri: string;
		extractTarget?: ExtractTarget;
		taskExecutionMode: TaskExecutionMode;
		includePermissions?: boolean;
	}

	export interface DeployParams {
		packageFilePath: string;
		databaseName: string;
		upgradeExisting: boolean;
		sqlCommandVariableValues?: Record<string, string>;
		deploymentOptions?: DeploymentOptions;
		ownerUri: string;
		taskExecutionMode: TaskExecutionMode;
	}

	export interface GenerateDeployScriptParams {
		packageFilePath: string;
		databaseName: string;
		sqlCommandVariableValues?: Record<string, string>;
		deploymentOptions?: DeploymentOptions;
		ownerUri: string;
		taskExecutionMode: TaskExecutionMode;
	}

	export interface GenerateDeployPlanParams {
		packageFilePath: string;
		databaseName: string;
		ownerUri: string;
		taskExecutionMode: TaskExecutionMode;
	}

	export interface GetOptionsFromProfileParams {
		profilePath: string;
	}

	export interface ValidateStreamingJobParams {
		packageFilePath: string;
		createStreamingJobTsql: string;
	}

	export interface SavePublishProfileParams {
		profilePath: string;
		databaseName: string;
		connectionString: string;
		sqlCommandVariableValues?: Record<string, string>;
		deploymentOptions?: DeploymentOptions;
	}

	/**
	 * Interface containing deployment options of boolean type
	 */
	export interface DacDeployOptionPropertyBoolean {
		value: boolean;
		description: string;
		displayName: string;
	}

	/**
	 * Interface containing deployment options of string[] type, value property holds enum names (nothing but option name) from <DacFx>\Product\Source\DeploymentApi\ObjectTypes.cs enum
	 */
	export interface DacDeployOptionPropertyObject {
		value: string[];
		description: string;
		displayName: string;
	}

	/*
	 * Interface containing Deployment options from <DacFx>\Source\DeploymentApi\DacDeployOptions.cs
	 * These property names should match with the properties defined in <sqltoolsservice>\src\Microsoft.SqlTools.ServiceLayer\DacFx\Contracts\DeploymentOptions.cs
	 */
	export interface DeploymentOptions {
		excludeObjectTypes: DacDeployOptionPropertyObject;
		// key will be the boolean option name
		booleanOptionsDictionary: { [key: string]: DacDeployOptionPropertyBoolean };
		// key will be the object type enum name (nothing but option name)
		objectTypesDictionary: { [key: string]: string };
	}
}