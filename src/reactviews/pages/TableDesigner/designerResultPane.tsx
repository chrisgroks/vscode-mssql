/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Button, Tab, TabList, makeStyles, shorthands } from "@fluentui/react-components";
import {
    ChevronDownFilled,
    ChevronUpFilled,
    CopyFilled,
    ErrorCircleRegular,
    InfoRegular,
    OpenFilled,
    WarningRegular,
} from "@fluentui/react-icons";
import {
    DesignerDataPropertyInfo,
    DesignerIssue,
    DesignerResultPaneTabs,
    InputBoxProperties,
    TableProperties,
} from "../../../sharedInterfaces/tableDesigner";
import { List, ListItem } from "@fluentui/react-list-preview";

import Editor from "@monaco-editor/react";
import { TableDesignerContext } from "./tableDesignerStateProvider";
import { resolveVscodeThemeType } from "../../common/utils";
import { locConstants } from "../../common/locConstants";
import { useContext } from "react";

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    ribbon: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        "> *": {
            marginRight: "10px",
        },
        padding: "5px 0px",
    },
    designerResultPaneTabs: {
        flex: 1,
    },
    tabContent: {
        ...shorthands.flex(1),
        width: "100%",
        height: "100%",
        display: "flex",
        ...shorthands.overflow("auto"),
    },
    designerResultPaneScript: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    designerResultPaneScriptOpenButton: {
        position: "absolute",
        top: "0px",
        right: "0px",
    },
    issuesContainer: {
        width: "100%",
        height: "calc( 100% - 10px )", // Subtracting 10px to account for padding and hiding double scrollbars
        flexDirection: "column",
        "> *": {
            marginBottom: "10px",
        },
        backgroundColor: "var(--vscode-editor-background)",
        padding: "5px",
        overflow: "hidden auto",
    },
    issuesRows: {
        display: "flex",
        lineHeight: "20px",
        padding: "5px",
        "> *": {
            marginRight: "10px",
        },
        ":hover": {
            backgroundColor: "var(--vscode-editor-selectionHighlightBackground)",
        },
        width: "100%",
    },
});

export const DesignerResultPane = () => {
    const classes = useStyles();
    const context = useContext(TableDesignerContext);
    const state = context?.state;

    if (!state) {
        return undefined;
    }

    /**
     * Helper function to find the element to focus based on property path length
     * @param propertyPath The path to the property
     * @param tableComponent The table component if applicable
     * @param context The context containing element references
     * @returns The HTML element to focus, or undefined if not found
     */
    const findElementToFocus = (
        propertyPath: (string | number)[],
        tableComponent: DesignerDataPropertyInfo,
    ): HTMLElement | undefined => {
        const pathLength = propertyPath.length;
        // Handle direct component focus cases
        if (pathLength === 1 || pathLength === 3 || pathLength === 5) {
            // Direct focus on component in main tab area or properties pane
            return context.elementRefs.current[context.getComponentId(propertyPath as any)];
        }

        // Handle table row focus cases
        if (pathLength === 2 && tableComponent) {
            // Focus on first property of a table row
            const firstProperty = (tableComponent.componentProperties as TableProperties)
                .itemProperties[0].propertyName;
            return context.elementRefs.current[
                context.getComponentId([...propertyPath, firstProperty] as any)
            ];
        }

        // Handle nested table row focus cases
        if (pathLength === 4 && tableComponent) {
            // Focus on first property of a row in a nested table
            const subTableName = propertyPath[2];
            const subTableComponent = (
                tableComponent.componentProperties as TableProperties
            ).itemProperties.find((prop) => prop.propertyName === subTableName);

            if (!subTableComponent) {
                return undefined;
            }

            const firstPropertyInSubTable = (
                subTableComponent.componentProperties as TableProperties
            ).itemProperties[0].propertyName;

            return context.elementRefs.current[
                context.getComponentId([...propertyPath, firstPropertyInSubTable] as any)
            ];
        }

        return undefined;
    };

    const openAndFocusIssue = async (issue: DesignerIssue) => {
        const propertyPath = issue.propertyPath ?? [];

        if (!state?.view?.tabs) {
            return;
        }

        // Find the tab containing the component at the first level of the property path
        const targetPropertyName = propertyPath[0];
        const containingTab = state.view.tabs.find((tab) =>
            tab.components.some((component) => component.propertyName === targetPropertyName),
        );

        if (!containingTab) {
            return;
        }

        // Switch to the tab containing the issue
        context.setTab(containingTab.id as any);
        await setTimeout(() => {}, 1000); // Wait for the DOM to update

        if (propertyPath.length > 1) {
            // Find the table component that contains the issue
            let tableComponent = containingTab.components.find(
                (component) => component.propertyName === targetPropertyName,
            );

            if (!tableComponent) {
                return;
            }

            let tableModel = state.model![tableComponent.propertyName];
            if (!tableModel) {
                return;
            }

            // Load properties for the row containing the issue
            context.setPropertiesComponents({
                componentPath: [targetPropertyName, propertyPath[1]],
                component: tableComponent,
                model: tableModel,
            });

            // Use requestAnimationFrame to ensure the DOM has updated before trying to focus
            requestAnimationFrame(async () => {
                const elementToFocus = findElementToFocus(propertyPath, tableComponent);
                console.log(context.elementRefs.current);

                if (elementToFocus) {
                    // Scroll the element into view and focus it
                    elementToFocus.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                    });

                    elementToFocus.focus();
                }
            });
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.ribbon}>
                <TabList
                    size="small"
                    selectedValue={state.tabStates!.resultPaneTab}
                    onTabSelect={(_event, data) => {
                        context.setResultTab(data.value as DesignerResultPaneTabs);
                    }}
                    className={classes.designerResultPaneTabs}>
                    <Tab value={DesignerResultPaneTabs.Script} key={DesignerResultPaneTabs.Script}>
                        {locConstants.tableDesigner.scriptAsCreate}
                    </Tab>
                    {state.issues?.length !== 0 && (
                        <Tab
                            value={DesignerResultPaneTabs.Issues}
                            key={DesignerResultPaneTabs.Issues}>
                            {locConstants.tableDesigner.issuesTabHeader(state.issues?.length!)}
                        </Tab>
                    )}
                </TabList>
                {state.tabStates!.resultPaneTab === DesignerResultPaneTabs.Script && (
                    <>
                        <Button
                            size="small"
                            appearance="outline"
                            onClick={() => context.scriptAsCreate()}
                            title={locConstants.tableDesigner.openInEditor}
                            icon={<OpenFilled />}>
                            {locConstants.tableDesigner.openInEditor}
                        </Button>
                        <Button
                            size="small"
                            appearance="outline"
                            onClick={() => context.copyScriptAsCreateToClipboard()}
                            title={locConstants.tableDesigner.copyScript}
                            icon={<CopyFilled />}>
                            {locConstants.tableDesigner.copyScript}
                        </Button>
                    </>
                )}
                <Button
                    size="small"
                    appearance="transparent"
                    onClick={() => {
                        if (context.resultPaneResizeInfo.isMaximized) {
                            context.resultPaneResizeInfo.setCurrentHeight(
                                context.resultPaneResizeInfo.originalHeight,
                            );
                        }
                        context.resultPaneResizeInfo.setIsMaximized(
                            !context.resultPaneResizeInfo.isMaximized,
                        );
                    }}
                    title={
                        context.resultPaneResizeInfo.isMaximized
                            ? locConstants.tableDesigner.restorePanelSize
                            : locConstants.tableDesigner.maximizePanelSize
                    }
                    icon={
                        context.resultPaneResizeInfo.isMaximized ? (
                            <ChevronDownFilled />
                        ) : (
                            <ChevronUpFilled />
                        )
                    }
                />
            </div>
            <div className={classes.tabContent}>
                {state.tabStates!.resultPaneTab === DesignerResultPaneTabs.Script && (
                    <div className={classes.designerResultPaneScript}>
                        <Editor
                            height={"100%"}
                            width={"100%"}
                            language="sql"
                            theme={resolveVscodeThemeType(context?.themeKind)}
                            value={(state?.model!["script"] as InputBoxProperties).value ?? ""}
                            options={{
                                readOnly: true,
                            }}></Editor>
                    </div>
                )}
                {state.tabStates!.resultPaneTab === DesignerResultPaneTabs.Issues &&
                    state.issues?.length !== 0 && (
                        <div className={classes.issuesContainer}>
                            <List navigationMode="items">
                                {state.issues!.map((item, index) => {
                                    return (
                                        <ListItem
                                            key={`issue-${index}`}
                                            onAction={async () => openAndFocusIssue(item)}>
                                            <div className={classes.issuesRows}>
                                                {item.severity === "error" && (
                                                    <ErrorCircleRegular
                                                        fontSize={20}
                                                        color="var(--vscode-errorForeground)"
                                                    />
                                                )}
                                                {item.severity === "warning" && (
                                                    <WarningRegular fontSize={20} color="yellow" />
                                                )}
                                                {item.severity === "information" && (
                                                    <InfoRegular fontSize={20} color="blue" />
                                                )}
                                                {item.description}
                                            </div>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    )}
            </div>
        </div>
    );
};
