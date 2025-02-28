/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ElectronApplication, Page } from "@playwright/test";
import { expect, test } from "./baseFixtures";
import { launchVsCodeWithMssqlExtension } from "./utils/launchVscodeWithMsSqlExt";
import { screenshotOnFailure } from "./utils/screenshotOnError";

test.describe("MSSQL Extension - Query Plan", async () => {
    let vsCodeApp: ElectronApplication;
    let vsCodePage: Page;

    test.beforeAll(async () => {
        const { electronApp, page } = await launchVsCodeWithMssqlExtension();
        vsCodeApp = electronApp;
        vsCodePage = page;
    });

    test("Query Plan should be open", async () => {
        // Open fileusing VS Code's command palette
        await new Promise((resolve) => setTimeout(resolve, 1 * 1000));
        await vsCodePage.keyboard.press("Control+P");
        await vsCodePage.keyboard.type(
            process.cwd() + "\\test\\resources\\plan.sqlplan",
        );
        await vsCodePage.keyboard.press("Enter");
        await new Promise((resolve) => setTimeout(resolve, 1 * 1000));

        const executionPlanLoadingText = vsCodePage.getByText(
            "Loading execution plan...",
        );
        const queryCostText = vsCodePage.getByText(
            "Query Cost (relative to the script)",
        );

        // Wait for "Loading execution plan..." to appear first
        await expect(executionPlanLoadingText).toBeVisible();

        // Wait for "Query Cost (relative to the script)" to appear (meaning loading is done)
        await expect(queryCostText).toBeVisible();
    });

    test.afterEach(async ({}, testInfo) => {
        await screenshotOnFailure(vsCodePage, testInfo);
    });

    test.afterAll(async () => {
        await vsCodeApp.close();
    });
});
