/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode-mssql' {
	/**
	 * Interface for working with .sqlproj files
	 */
	export interface ISqlProjectsService {
		/**
			 * Add a dacpac reference to a project
			 * @param projectUri Absolute path of the project, including .sqlproj
			 * @param dacpacPath Path to the .dacpac file
			 * @param suppressMissingDependencies Whether to suppress missing dependencies
			 * @param databaseVariable SQLCMD variable name for specifying the other database this reference is to, if different from that of the current project
			 * @param serverVariable SQLCMD variable name for specifying the other server this reference is to, if different from that of the current project.
				If this is set, DatabaseVariable must also be set.
			 * @param databaseLiteral Literal name used to reference another database in the same server, if not using SQLCMD variables
			 */
		addDacpacReference(
			projectUri: string,
			dacpacPath: string,
			suppressMissingDependencies: boolean,
			databaseVariable?: string,
			serverVariable?: string,
			databaseLiteral?: string
		): Promise<ResultStatus>;

		/**
			 * Add a SQL Project reference to a project
			 * @param projectUri Absolute path of the project, including .sqlproj
			 * @param projectPath Path to the referenced .sqlproj file
			 * @param projectGuid GUID for the referenced SQL project
			 * @param suppressMissingDependencies Whether to suppress missing dependencies
			 * @param databaseVariable SQLCMD variable name for specifying the other database this reference is to, if different from that of the current project
			 * @param serverVariable SQLCMD variable name for specifying the other server this reference is to, if different from that of the current project.
				 If this is set, DatabaseVariable must also be set.
			 * @param databaseLiteral Literal name used to reference another database in the same server, if not using SQLCMD variables
			 */
		addSqlProjectReference(
			projectUri: string,
			projectPath: string,
			projectGuid: string,
			suppressMissingDependencies: boolean,
			databaseVariable?: string,
			serverVariable?: string,
			databaseLiteral?: string
		): Promise<ResultStatus>;

		/**
		 * Add a system database reference to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param systemDatabase Type of system database
		 * @param suppressMissingDependencies Whether to suppress missing dependencies
		 * @param referenceType Type of reference - ArtifactReference or PackageReference
		 * @param databaseLiteral Literal name used to reference another database in the same server, if not using SQLCMD variables
		 */
		addSystemDatabaseReference(
			projectUri: string,
			systemDatabase: SystemDatabase,
			suppressMissingDependencies: boolean,
			referenceType: SystemDbReferenceType,
			databaseLiteral?: string
		): Promise<ResultStatus>;

		/**
			 * Add a nuget package database reference to a project
			 * @param projectUri Absolute path of the project, including .sqlproj
			 * @param packageName Name of the referenced nuget package
			 * @param packageVersion Version of the referenced nuget package
			 * @param suppressMissingDependencies Whether to suppress missing dependencies
			 * @param databaseVariable SQLCMD variable name for specifying the other database this reference is to, if different from that of the current project
			 * @param serverVariable SQLCMD variable name for specifying the other server this reference is to, if different from that of the current project.
				 If this is set, DatabaseVariable must also be set.
			 * @param databaseLiteral Literal name used to reference another database in the same server, if not using SQLCMD variables
			 */
		addNugetPackageReference(
			projectUri: string,
			packageName: string,
			packageVersion: string,
			suppressMissingDependencies: boolean,
			databaseVariable?: string,
			serverVariable?: string,
			databaseLiteral?: string
		): Promise<ResultStatus>;

		/**
		 * Delete a database reference from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param name Name of the reference to be deleted. Name of the System DB, path of the sqlproj, or path of the dacpac
		 */
		deleteDatabaseReference(
			projectUri: string,
			name: string
		): Promise<ResultStatus>;

		/**
		 * Add a folder to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the folder, typically relative to the .sqlproj file
		 */
		addFolder(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Delete a folder from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the folder, typically relative to the .sqlproj file
		 */
		deleteFolder(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Exclude a folder and its contents from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the folder, typically relative to the .sqlproj file
		 */
		excludeFolder(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Move a folder and its contents within a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param sourcePath Source path of the folder, typically relative to the .sqlproj file
		 * @param destinationPath Destination path of the folder, typically relative to the .sqlproj file
		 */
		moveFolder(
			projectUri: string,
			sourcePath: string,
			destinationPath: string
		): Promise<ResultStatus>;

		/**
		 * Add a post-deployment script to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		addPostDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Add a pre-deployment script to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		addPreDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Delete a post-deployment script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		deletePostDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Delete a pre-deployment script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		deletePreDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Exclude a post-deployment script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		excludePostDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Exclude a pre-deployment script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		excludePreDeploymentScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Move a post-deployment script in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 * @param destinationPath Destination path of the file or folder, relative to the .sqlproj
		 */
		movePostDeploymentScript(
			projectUri: string,
			path: string,
			destinationPath: string
		): Promise<ResultStatus>;

		/**
		 * Move a pre-deployment script in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 * @param destinationPath Destination path of the file or folder, relative to the .sqlproj
		 */
		movePreDeploymentScript(
			projectUri: string,
			path: string,
			destinationPath: string
		): Promise<ResultStatus>;

		/**
		 * Close a SQL project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		closeProject(projectUri: string): Promise<ResultStatus>;

		/**
			 * Create a new SQL project
			 * @param projectUri Absolute path of the project, including .sqlproj
			 * @param sqlProjectType Type of SQL Project: SDK-style or Legacy
			 * @param databaseSchemaProvider Database schema provider for the project, in the format
				 "Microsoft.Data.Tools.Schema.Sql.SqlXYZDatabaseSchemaProvider".
				 Case sensitive.
			 * @param buildSdkVersion Version of the Microsoft.Build.Sql SDK for the project, if overriding the default
			 */
		createProject(
			projectUri: string,
			sqlProjectType: ProjectType,
			databaseSchemaProvider?: string,
			buildSdkVersion?: string
		): Promise<ResultStatus>;

		/**
		 * Get the cross-platform compatibility status for a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getCrossPlatformCompatibility(
			projectUri: string
		): Promise<GetCrossPlatformCompatibilityResult>;

		/**
		 * Open an existing SQL project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		openProject(projectUri: string): Promise<ResultStatus>;

		/**
		 * Update a SQL project to be cross-platform compatible
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		updateProjectForCrossPlatform(projectUri: string): Promise<ResultStatus>;

		/**
		 * Set the DatabaseSource property of a .sqlproj file
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param databaseSource Source of the database schema, used in telemetry
		 */
		setDatabaseSource(
			projectUri: string,
			databaseSource: string
		): Promise<ResultStatus>;

		/**
		 * Set the DatabaseSchemaProvider property of a SQL project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param databaseSchemaProvider New DatabaseSchemaProvider value, in the form "Microsoft.Data.Tools.Schema.Sql.SqlXYZDatabaseSchemaProvider"
		 */
		setDatabaseSchemaProvider(
			projectUri: string,
			databaseSchemaProvider: string
		): Promise<ResultStatus>;

		/**
		 * Get the cross-platform compatibility status for a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getProjectProperties(
			projectUri: string
		): Promise<GetProjectPropertiesResult>;

		/**
		 * Add a SQLCMD variable to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param name Name of the SQLCMD variable
		 * @param defaultValue Default value of the SQLCMD variable
		 */
		addSqlCmdVariable(
			projectUri: string,
			name: string,
			defaultValue: string
		): Promise<ResultStatus>;

		/**
		 * Delete a SQLCMD variable from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param name Name of the SQLCMD variable to be deleted
		 */
		deleteSqlCmdVariable(
			projectUri: string,
			name?: string
		): Promise<ResultStatus>;

		/**
		 * Update an existing SQLCMD variable in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param name Name of the SQLCMD variable
		 * @param defaultValue Default value of the SQLCMD variable
		 */
		updateSqlCmdVariable(
			projectUri: string,
			name: string,
			defaultValue: string
		): Promise<ResultStatus>;

		/**
		 * Add a SQL object script to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		addSqlObjectScript(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Delete a SQL object script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		deleteSqlObjectScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Exclude a SQL object script from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 */
		excludeSqlObjectScript(
			projectUri: string,
			path: string
		): Promise<ResultStatus>;

		/**
		 * Move a SQL object script in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the script, including .sql, relative to the .sqlproj
		 * @param destinationPath Destination path of the file or folder, relative to the .sqlproj
		 */
		moveSqlObjectScript(
			projectUri: string,
			path: string,
			destinationPath: string
		): Promise<ResultStatus>;

		/**
		 * Get all the database references in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getDatabaseReferences(
			projectUri: string
		): Promise<GetDatabaseReferencesResult>;

		/**
		 * Get all the folders in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getFolders(projectUri: string): Promise<GetFoldersResult>;

		/**
		 * Get all the post-deployment scripts in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getPostDeploymentScripts(projectUri: string): Promise<GetScriptsResult>;

		/**
		 * Get all the pre-deployment scripts in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getPreDeploymentScripts(projectUri: string): Promise<GetScriptsResult>;

		/**
		 * Get all the SQLCMD variables in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getSqlCmdVariables(projectUri: string): Promise<GetSqlCmdVariablesResult>;

		/**
		 * Get all the SQL object scripts in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getSqlObjectScripts(projectUri: string): Promise<GetScriptsResult>;

		/**
		 * Add a None item to a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the item, including extension, relative to the .sqlproj
		 */
		addNoneItem(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Delete a None item from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the item, including extension, relative to the .sqlproj
		 */
		deleteNoneItem(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Exclude a None item from a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the item, including extension, relative to the .sqlproj
		 */
		excludeNoneItem(projectUri: string, path: string): Promise<ResultStatus>;

		/**
		 * Get all the None items in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 */
		getNoneItems(projectUri: string): Promise<GetScriptsResult>;

		/**
		 * Move a None item in a project
		 * @param projectUri Absolute path of the project, including .sqlproj
		 * @param path Path of the item, including extension, relative to the .sqlproj
		 * @param destinationPath Destination path of the file or folder, relative to the .sqlproj
		 */
		moveNoneItem(
			projectUri: string,
			path: string,
			destinationPath: string
		): Promise<ResultStatus>;
	}

	//#region Parameters

	export interface SqlProjectParams {
		/**
		 * Absolute path of the project, including .sqlproj
		 */
		projectUri: string;
	}

	export interface SqlProjectScriptParams extends SqlProjectParams {
		/**
		 * Path of the script, including .sql, relative to the .sqlproj
		 */
		path: string;
	}

	export interface AddDacpacReferenceParams
		extends AddUserDatabaseReferenceParams {
		/**
		 * Path to the .dacpac file
		 */
		dacpacPath: string;
	}

	export interface AddDatabaseReferenceParams extends SqlProjectParams {
		/**
		 * Whether to suppress missing dependencies
		 */
		suppressMissingDependencies: boolean;
		/**
		 * Literal name used to reference another database in the same server, if not using SQLCMD variables
		 */
		databaseLiteral?: string;
	}

	export interface AddSqlProjectReferenceParams
		extends AddUserDatabaseReferenceParams {
		/**
		 * Path to the referenced .sqlproj file
		 */
		projectPath: string;
		/**
		 * GUID for the referenced SQL project
		 */
		projectGuid: string;
	}

	export interface AddSystemDatabaseReferenceParams
		extends AddDatabaseReferenceParams {
		/**
		 * Type of system database
		 */
		systemDatabase: SystemDatabase;

		/**
		 * Type of reference - ArtifactReference or PackageReference
		 */
		referenceType: SystemDbReferenceType;
	}

	export interface AddNugetPackageReferenceParams
		extends AddUserDatabaseReferenceParams {
		/**
		 * NuGet package name
		 */
		packageName: string;

		/**
		 * NuGet package version
		 */
		packageVersion: string;
	}

	export interface AddUserDatabaseReferenceParams
		extends AddDatabaseReferenceParams {
		/**
		 * SQLCMD variable name for specifying the other database this reference is to, if different from that of the current project
		 */
		databaseVariable?: string;
		/**
		 * SQLCMD variable name for specifying the other server this reference is to, if different from that of the current project.
		 * If this is set, DatabaseVariable must also be set.
		 */
		serverVariable?: string;
	}

	export interface DeleteDatabaseReferenceParams extends SqlProjectParams {
		/**
		 * Name of the reference to be deleted.  Name of the System DB, path of the sqlproj, or path of the dacpac
		 */
		name: string;
	}

	export interface FolderParams extends SqlProjectParams {
		/**
		 * Path of the folder, typically relative to the .sqlproj file
		 */
		path: string;
	}

	export interface MoveFolderParams extends FolderParams {
		/**
		 * Path of the folder, typically relative to the .sqlproj file
		 */
		destinationPath: string;
	}

	export interface CreateSqlProjectParams extends SqlProjectParams {
		/**
		 * Type of SQL Project: SDK-style or Legacy
		 */
		sqlProjectType: ProjectType;
		/**
		 * Database schema provider for the project, in the format
		 * "Microsoft.Data.Tools.Schema.Sql.SqlXYZDatabaseSchemaProvider".
		 * Case sensitive.
		 */
		databaseSchemaProvider?: string;
		/**
		 * Version of the Microsoft.Build.Sql SDK for the project, if overriding the default
		 */
		buildSdkVersion?: string;
	}

	export interface AddSqlCmdVariableParams extends SqlProjectParams {
		/**
		 * Name of the SQLCMD variable
		 */
		name: string;
		/**
		 * Default value of the SQLCMD variable
		 */
		defaultValue: string;
	}

	export interface DeleteSqlCmdVariableParams extends SqlProjectParams {
		/**
		 * Name of the SQLCMD variable to be deleted
		 */
		name?: string;
	}

	export interface MoveItemParams extends SqlProjectScriptParams {
		/**
		 * Destination path of the file or folder, relative to the .sqlproj
		 */
		destinationPath: string;
	}

	export interface SetDatabaseSourceParams extends SqlProjectParams {
		/**
		 * Source of the database schema, used in telemetry
		 */
		databaseSource: string;
	}

	export interface SetDatabaseSchemaProviderParams extends SqlProjectParams {
		/**
		 * New DatabaseSchemaProvider value, in the form "Microsoft.Data.Tools.Schema.Sql.SqlXYZDatabaseSchemaProvider"
		 */
		databaseSchemaProvider: string;
	}

	//#endregion

	//#region Results

	export interface GetCrossPlatformCompatibilityResult extends ResultStatus {
		/**
		 * Whether the project is cross-platform compatible
		 */
		isCrossPlatformCompatible: boolean;
	}

	export interface GetProjectPropertiesResult extends ResultStatus {
		/**
		 * GUID for the SQL project
		 */
		projectGuid: string;
		/**
		 * Build configuration, defaulted to Debug if not specified
		 */
		configuration: string;
		/**
		 * Build platform, defaulted to AnyCPU if not specified
		 */
		platform: string;
		/**
			 * Output path for build, defaulted to "bin/Debug" if not specified.
				 May be absolute or relative.
			 */
		outputPath: string;
		/**
		 * Default collation for the project, defaulted to SQL_Latin1_General_CP1_CI_AS if not specified
		 */
		defaultCollation: string;
		/**
		 * Source of the database schema, used in telemetry
		 */
		databaseSource?: string;
		/**
		 * Style of the .sqlproj file - SdkStyle or LegacyStyle
		 */
		projectStyle: ProjectType;
		/**
		 * Database Schema Provider, in the format "Microsoft.Data.Tools.Schema.Sql.SqlXYZDatabaseSchemaProvider"
		 */
		databaseSchemaProvider: string;
	}

	export interface GetDatabaseReferencesResult extends ResultStatus {
		/**
		 * Array of system database references contained in the project
		 */
		systemDatabaseReferences: SystemDatabaseReference[];
		/**
		 * Array of dacpac references contained in the project
		 */
		dacpacReferences: DacpacReference[];
		/**
		 * Array of SQL project references contained in the project
		 */
		sqlProjectReferences: SqlProjectReference[];
		/**
		 * Array of NuGet package references contained in the project
		 */
		nugetPackageReferences: NugetPackageReference[];
	}

	export interface GetFoldersResult extends ResultStatus {
		/**
		 * Array of folders contained in the project
		 */
		folders: string[];
	}

	export interface GetSqlCmdVariablesResult extends ResultStatus {
		/**
		 * Array of SQLCMD variables contained in the project
		 */
		sqlCmdVariables: SqlCmdVariable[];
	}

	export interface GetScriptsResult extends ResultStatus {
		/**
		 * Array of scripts contained in the project
		 */
		scripts: string[];
	}

	//#endregion

	//#region Types

	export const enum ProjectType {
		SdkStyle = 0,
		LegacyStyle = 1,
	}

	export const enum SystemDatabase {
		Master = 0,
		MSDB = 1,
	}

	export const enum SystemDbReferenceType {
		ArtifactReference = 0,
		PackageReference = 1,
	}

	export interface DatabaseReference {
		suppressMissingDependencies: boolean;
		databaseVariableLiteralName?: string;
	}

	interface UserDatabaseReference extends DatabaseReference {
		databaseVariable?: SqlCmdVariable;
		serverVariable?: SqlCmdVariable;
	}

	export interface SystemDatabaseReference extends DatabaseReference {
		systemDb: SystemDatabase;
	}

	export interface SqlProjectReference extends UserDatabaseReference {
		projectPath: string;
		projectGuid?: string;
	}

	export interface DacpacReference extends UserDatabaseReference {
		dacpacPath: string;
	}

	export interface NugetPackageReference extends UserDatabaseReference {
		packageName: string;
		packageVersion: string;
	}

	export interface SqlCmdVariable {
		varName: string;
		value: string;
		defaultValue: string;
	}

	//#endregion
}