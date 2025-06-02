/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import { IConnectionGroup } from "./interfaces/connectionGroup";
import { IConnectionProfile } from "./interfaces";

/**
 * Manages the storage and retrieval of connection groups
 */
export class ConnectionGroupStore {
    private static readonly ConfigKey = "mssql.connectionGroups";

    /**
     * Gets all saved connection groups
     */
    public async getGroups(): Promise<IConnectionGroup[]> {
        const config = vscode.workspace.getConfiguration();
        let groups = config.get<IConnectionGroup[]>(ConnectionGroupStore.ConfigKey);
        if (!groups) {
            // Initialize with empty array if the configuration doesn't exist yet
            groups = [];
            await config.update(
                ConnectionGroupStore.ConfigKey,
                groups,
                vscode.ConfigurationTarget.Global,
            );
        }
        return groups.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }

    /**
     * Saves a connection group
     */
    public async saveGroup(group: IConnectionGroup): Promise<void> {
        const groups = await this.getGroups();
        const existingIndex = groups.findIndex((g) => g.id === group.id);

        if (existingIndex >= 0) {
            groups[existingIndex] = group;
        } else {
            // For new groups, ensure they have a display order
            if (group.displayOrder === undefined) {
                group.displayOrder = groups.length;
            }
            groups.push(group);
        }

        await vscode.workspace
            .getConfiguration()
            .update(ConnectionGroupStore.ConfigKey, groups, vscode.ConfigurationTarget.Global);
    }

    /**
     * Deletes a connection group
     */
    public async deleteGroup(groupId: string): Promise<void> {
        const groups = await this.getGroups();
        const filteredGroups = groups.filter((g) => g.id !== groupId);

        await vscode.workspace
            .getConfiguration()
            .update(
                ConnectionGroupStore.ConfigKey,
                filteredGroups,
                vscode.ConfigurationTarget.Global,
            );
    }

    /**
     * Gets a specific connection group by ID
     */
    public async getGroup(groupId: string): Promise<IConnectionGroup | undefined> {
        const groups = await this.getGroups();
        return groups.find((g) => g.id === groupId);
    }

    /**
     * Adds a connection to a group
     */
    public async addConnectionToGroup(
        groupId: string,
        connection: IConnectionProfile,
    ): Promise<void> {
        const groups = await this.getGroups();
        const group = groups.find((g) => g.id === groupId);

        if (group) {
            if (!group.connections) {
                group.connections = [];
            }

            // Check if connection already exists in group
            const existingIndex = group.connections.findIndex(
                (c) =>
                    c.server === connection.server &&
                    c.database === connection.database &&
                    c.user === connection.user,
            );

            if (existingIndex >= 0) {
                group.connections[existingIndex] = connection;
            } else {
                group.connections.push(connection);
            }

            await this.saveGroup(group);
        }
    }

    /**
     * Removes a connection from a group
     */
    public async removeConnectionFromGroup(
        groupId: string,
        connection: IConnectionProfile,
    ): Promise<void> {
        const groups = await this.getGroups();
        const group = groups.find((g) => g.id === groupId);

        if (group && group.connections) {
            group.connections = group.connections.filter(
                (c) =>
                    !(
                        c.server === connection.server &&
                        c.database === connection.database &&
                        c.user === connection.user
                    ),
            );

            await this.saveGroup(group);
        }
    }
}
