/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useContext } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    makeStyles,
    Text,
} from "@fluentui/react-components";
import { AzureAccountManagementContext } from "./azureAccountManagementStateProvider";
import { locConstants as Loc } from "../../common/locConstants";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
    },
});

export const AzureAccountManagementDialog = () => {
    const classes = useStyles();
    const context = useContext(AzureAccountManagementContext);

    if (!context) {
        return undefined;
    }

    return (
        <Dialog open={true}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Azure Account Management</DialogTitle>
                    <DialogContent>
                        <div className={classes.welcomeContainer}>
                            <Text size={300} weight="semibold">
                                {context.state.message || "Welcome to Azure Account Management"}
                            </Text>
                            <Text size={200} style={{ marginTop: "10px" }}>
                                This dialog will help you manage your Azure accounts.
                            </Text>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="secondary" onClick={() => console.log()}>
                            {Loc.common.close}
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
