/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export class Semaphore {
    private _locked = false;
    private _waiting: (() => void)[] = [];

    async acquire(): Promise<void> {
        if (!this._locked) {
            this._locked = true;
            return;
        }

        return new Promise((resolve) => {
            this._waiting.push(resolve);
        });
    }

    release(): void {
        if (this._waiting.length > 0) {
            const next = this._waiting.shift();
            next?.();
        } else {
            this._locked = false;
        }
    }
}
