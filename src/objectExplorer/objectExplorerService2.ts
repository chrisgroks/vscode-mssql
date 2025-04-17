/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import ConnectionManager from "../controllers/connectionManager";
import VscodeWrapper from "../controllers/vscodeWrapper";
import SqlToolsServiceClient from "../languageservice/serviceclient";
import {
    CreateSessionCompleteNotification,
    SessionCreatedParameters,
} from "../models/contracts/objectExplorer/createSessionRequest";
import {
    ExpandCompleteNotification,
    ExpandParams,
    ExpandResponse,
} from "../models/contracts/objectExplorer/expandNodeRequest";
import { Logger } from "../models/logger";
import { Deferred } from "../protocol";
import { ConnectionGroupNode } from "./nodes/connectionGroupNode";
import { TreeNodeInfo } from "./treeNodeInfo";

export class ObjectExplorerService2 {
    private _stsClient: SqlToolsServiceClient;
    private _logger: Logger;

    // Map of sessionId to Deferred<SessionCreatedParameters>
    private _pendingSessionPromises: Map<string, Deferred<SessionCreatedParameters>> = new Map();
    // Map of ExpandParams to Deferred<TreeNodeInfo[]>
    private _pendingExpandPromises: Map<ExpandParams, Deferred<ExpandParams>> = new Map();

    constructor(
        private _vscodeWrapper: VscodeWrapper,
        private _connectionManager: ConnectionManager,
    ) {
        if (!_vscodeWrapper) {
            this._vscodeWrapper = new VscodeWrapper();
        }
        this._stsClient = this._connectionManager.client;
        this._logger = Logger.create(this._vscodeWrapper.outputChannel, "ObjectExplorerService");

        this._stsClient.onNotification(
            CreateSessionCompleteNotification.type,
            this.onSessionCreated,
        );

        this._stsClient.onNotification(ExpandCompleteNotification.type, this.onExpandComplete);
    }

    private onSessionCreated(result: SessionCreatedParameters) {
        const deferred = this._pendingSessionPromises.get(result.sessionId);
        if (deferred) {
            deferred.resolve(result);
            this._pendingSessionPromises.delete(result.sessionId);
        } else {
            this._logger.error(
                `Received session created notification for unknown sessionId: ${result.sessionId}`,
            );
        }
    }

    private onExpandComplete(result: ExpandResponse) {
        const deferred = this._pendingExpandPromises.get(result);
        if (deferred) {
            deferred.resolve(result);
            this._pendingExpandPromises.delete(result);
        } else {
            this._logger.error(
                `Received expand complete notification for unknown params: ${result.params}`,
            );
        }
    }

    /**
     *
     * @param element The element to expand. If undefined, the root node will be expanded.
     */
    public getChildren(element?: TreeNodeInfo) {
        if (!element) {
        }
    }

    public expandConnectionGroup(connectionGroup: ConnectionGroupNode): Promise<TreeNodeInfo[]> {}
}
