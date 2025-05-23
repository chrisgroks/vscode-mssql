/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import ConnectionManager from "../controllers/connectionManager";
import { CreateSessionResult, ObjectExplorerService } from "./objectExplorerService";
import { ConnectableTreeNodeInfo } from "./nodes/treeNodeInfo";
import { Deferred } from "../protocol";
import { IConnectionInfo } from "vscode-mssql";
import VscodeWrapper from "../controllers/vscodeWrapper";
import { IConnectionProfile } from "../models/interfaces";
import { ConnectionNode } from "./nodes/connectionNode";

export class ObjectExplorerProvider implements vscode.TreeDataProvider<any> {
    private _onDidChangeTreeData: vscode.EventEmitter<any | undefined> = new vscode.EventEmitter<
        any | undefined
    >();
    readonly onDidChangeTreeData: vscode.Event<any | undefined> = this._onDidChangeTreeData.event;

    private _objectExplorerService: ObjectExplorerService;

    constructor(
        private _vscodeWrapper: VscodeWrapper,
        connectionManager: ConnectionManager,
    ) {
        if (!_vscodeWrapper) {
            this._vscodeWrapper = new VscodeWrapper();
        }

        this._objectExplorerService = new ObjectExplorerService(
            this._vscodeWrapper,
            connectionManager,
            (node) => {
                this.refresh(node);
            },
        );
    }

    public getParent(element: ConnectableTreeNodeInfo) {
        return element.parentNode;
    }

    public refresh(nodeInfo?: ConnectableTreeNodeInfo): void {
        this._onDidChangeTreeData.fire(nodeInfo);
    }

    public getTreeItem(node: ConnectableTreeNodeInfo): ConnectableTreeNodeInfo {
        return node;
    }

    public async getChildren(element?: ConnectableTreeNodeInfo): Promise<vscode.TreeItem[]> {
        const children = await this._objectExplorerService.getChildren(element);
        if (children) {
            return children;
        }
    }

    public async createSession(
        connectionCredentials?: IConnectionInfo,
    ): Promise<CreateSessionResult> {
        return this._objectExplorerService.createSession(connectionCredentials);
    }

    public async expandNode(
        node: ConnectableTreeNodeInfo,
        sessionId: string,
        promise: Deferred<ConnectableTreeNodeInfo[]>,
    ): Promise<boolean> {
        return this._objectExplorerService.expandNode(node, sessionId, promise);
    }

    public async removeNode(node: ConnectionNode): Promise<void> {
        await this._objectExplorerService.removeNode(node);
    }

    public async disconnectNode(node: ConnectionNode): Promise<void> {
        await this._objectExplorerService.disconnectNode(node);
        this.refresh(node);
    }

    public async refreshNode(node: ConnectableTreeNodeInfo): Promise<void> {
        node.shouldRefresh = true;
        this._onDidChangeTreeData.fire(node);
    }

    public async removeConnectionNodes(connections: IConnectionInfo[]): Promise<void> {
        await this._objectExplorerService.removeConnectionNodes(connections);
        this.refresh(undefined);
    }

    public addDisconnectedNode(connectionCredentials: IConnectionProfile): void {
        this._objectExplorerService.addDisconnectedNode(connectionCredentials);
    }

    public deleteChildrenCache(node: ConnectableTreeNodeInfo): void {
        this._objectExplorerService.cleanNodeChildren(node);
    }

    public get rootNodeConnections(): IConnectionInfo[] {
        return this._objectExplorerService.rootNodeConnections;
    }

    /* Only for testing purposes */
    public set objectExplorerService(value: ObjectExplorerService) {
        this._objectExplorerService = value;
    }
}
