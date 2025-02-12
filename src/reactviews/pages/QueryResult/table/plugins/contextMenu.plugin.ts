/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
    QueryResultReducers,
    QueryResultWebviewState,
    ResultSetSummary,
} from "../../../../../sharedInterfaces/queryResult";
import { locConstants } from "../../../../common/locConstants";
import { VscodeWebviewContext } from "../../../../common/vscodeWebviewProvider";
import { HybridDataProvider } from "../hybridDataProvider";
import { tryCombineSelectionsForResults } from "../utils";
import { deepClone } from "../../../../common/utils";
import "./contextMenu.css";

export class ContextMenu<T extends Slick.SlickData> {
    private grid!: Slick.Grid<T>;
    private handler = new Slick.EventHandler();
    private uri: string;
    private resultSetSummary: ResultSetSummary;
    private webViewState: VscodeWebviewContext<
        QueryResultWebviewState,
        QueryResultReducers
    >;
    private activeContextMenu: JQuery<HTMLElement> | null = null;
    private activePopup: JQuery<HTMLElement> | null = null;

    constructor(
        uri: string,
        resultSetSummary: ResultSetSummary,
        webViewState: VscodeWebviewContext<
            QueryResultWebviewState,
            QueryResultReducers
        >,
    ) {
        this.uri = uri;
        this.resultSetSummary = resultSetSummary;
        this.webViewState = webViewState;
    }

    public init(grid: Slick.Grid<T>): void {
        this.grid = grid;
        this.handler.subscribe(this.grid.onContextMenu, (e: Event) =>
            this.handleContextMenu(e),
        );
        this.handler.subscribe(this.grid.onHeaderClick, (e: Event) =>
            this.headerClickHandler(e),
        );
        this.handler.subscribe(this.grid.onHeaderContextMenu, (e: Event) =>
            this.headerClickHandler(e),
        );
    }

    public destroy() {
        this.handler.unsubscribeAll();
    }

    private headerClickHandler(e: Event): void {
        if (!(jQuery(e.target!) as any).closest("#contextMenu").length) {
            if (this.activeContextMenu) {
                this.activeContextMenu.hide();
            }
        }

        // Handle header right-click
        if (e.type === "contextmenu") {
            e.preventDefault();
            this.handleContextMenu(e);
        }
    }

    private handleContextMenu(e: Event): void {
        e.preventDefault();
        let mouseEvent = e as MouseEvent;
        const $contextMenu = jQuery(
            `<ul id="contextMenu">` +
                `<li data-action="select-all" class="contextMenu">${locConstants.queryResult.selectAll}</li>` +
                `<li data-action="copy" class="contextMenu">${locConstants.queryResult.copy}</li>` +
                `<li data-action="copy-with-headers" class="contextMenu">${locConstants.queryResult.copyWithHeaders}</li>` +
                `<li data-action="copy-headers" class="contextMenu">${locConstants.queryResult.copyHeaders}</li>` +
                `<li data-action="resize-column" class="contextMenu">${locConstants.queryResult.resize}</li>` +
                `</ul>`,
        );
        // Remove any existing context menus to avoid duplication
        jQuery("#contextMenu").remove();

        // Append the menu to the body and set its position
        jQuery("body").append($contextMenu);

        let cell = this.grid.getCellFromEvent(e);
        $contextMenu
            .data("row", cell.row)
            .css("top", mouseEvent.pageY)
            .css("left", mouseEvent.pageX)
            .show();

        this.activeContextMenu = $contextMenu;
        jQuery("body").one("click", () => {
            $contextMenu.hide();
            this.activeContextMenu = null;
        });

        $contextMenu.on("click", "li", async (event) => {
            const action = jQuery(event.target).data("action");
            await this.handleMenuAction(action, e);
            $contextMenu.hide(); // Hide the menu after an action is clicked
            this.activeContextMenu = null;
        });
    }

    private async handleMenuAction(action: string, e: Event): Promise<void> {
        let selectedRanges = this.grid.getSelectionModel().getSelectedRanges();
        let selection = tryCombineSelectionsForResults(selectedRanges);
        switch (action) {
            case "select-all":
                console.log("Select All action triggered");
                const data = this.grid.getData() as HybridDataProvider<T>;
                let selectionModel = this.grid.getSelectionModel();
                selectionModel.setSelectedRanges([
                    new Slick.Range(
                        0,
                        0,
                        data.length - 1,
                        this.grid.getColumns().length - 1,
                    ),
                ]);
                break;
            case "copy":
                await this.webViewState.extensionRpc.call("copySelection", {
                    uri: this.uri,
                    batchId: this.resultSetSummary.batchId,
                    resultId: this.resultSetSummary.id,
                    selection: selection,
                });

                console.log("Copy action triggered");
                break;
            case "copy-with-headers":
                await this.webViewState.extensionRpc.call("copyWithHeaders", {
                    uri: this.uri,
                    batchId: this.resultSetSummary.batchId,
                    resultId: this.resultSetSummary.id,
                    selection: selection,
                });

                console.log("Copy with Headers action triggered");
                break;
            case "copy-headers":
                await this.webViewState.extensionRpc.call("copyHeaders", {
                    uri: this.uri,
                    batchId: this.resultSetSummary.batchId,
                    resultId: this.resultSetSummary.id,
                    selection: selection,
                });
                console.log("Copy Headers action triggered");
                break;
            case "resize-column":
                this.showResizePopup(e);
                break;
            default:
                console.warn("Unknown action:", action);
        }
    }

    private showResizePopup(e: Event): void {
        e.preventDefault();
        const target = jQuery(e.target!);
        const offset = target.offset();

        if (this.activePopup) {
            this.activePopup.remove();
        }

        const $popup = jQuery(
            `<div id="popup-menu" class="slick-header-menu" style="width: 150px; padding: 8px;">` +
                `<label for="column-width" style="display: block; margin-bottom: 4px;">${locConstants.queryResult.enterWidth}</label>` +
                `<input type="number" id="column-width" class="inputbox" style="width: 90%; margin-bottom: 8px;" />` +
                `<button id="apply-resize" class="btn-primary" style="width: 100%; margin-bottom: 4px;">${locConstants.queryResult.apply}</button>` +
                `<button id="close-resize" class="btn" style="width: 100%">${locConstants.queryResult.close}</button>` +
                `</div>`,
        );

        $popup.css({
            top: offset!.top + target.outerHeight()!,
            left: Math.min(offset!.left, document.body.clientWidth - 200),
        });

        jQuery("body").append($popup);
        this.activePopup = $popup;

        $popup.find("#apply-resize").on("click", () => {
            const newWidth = Number($popup.find("#column-width").val());
            if (!isNaN(newWidth) && newWidth > 0) {
                this.resizeColumn(target, newWidth);
            }
            this.activePopup?.remove();
            this.activePopup = null;
        });

        $popup.find("#close-resize").on("click", () => {
            this.activePopup?.remove();
            this.activePopup = null;
        });
    }

    private resizeColumn(target: JQuery<EventTarget>, newWidth: number) {
        let headerEl = target.closest(".slick-header-column");
        let columnDef = headerEl.data("column");
        let colIndex = this.grid.getColumnIndex(columnDef.id!);
        let origCols = this.grid.getColumns();
        let allColumns = deepClone(origCols);

        allColumns.forEach((col, index) => {
            col.formatter = origCols[index].formatter;
            col.asyncPostRender = origCols[index].asyncPostRender;
        });

        allColumns[colIndex].width = newWidth;
        this.grid.setColumns(allColumns);
        this.grid.onColumnsResized.notify();
    }
}
