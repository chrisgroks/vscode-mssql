/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { useContext } from "react";
import { ConnectionDialogContext } from "../connectionDialogStateProvider";
import {
    Button,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    Textarea,
} from "@fluentui/react-components";

import { locConstants as Loc } from "../../../common/locConstants";
import { LoadFromConnectionStringDialogProps } from "../../../../sharedInterfaces/connectionDialog";

export const LoadFromConnectionStringDialog = ({
    dialogProps,
}: {
    dialogProps: LoadFromConnectionStringDialogProps;
}) => {
    const context = useContext(ConnectionDialogContext)!;

    return (
        <Dialog open={dialogProps.type === "loadFromConnectionString"}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>
                        {Loc.connectionDialog.createNewFirewallRule}
                    </DialogTitle>
                    <DialogContent>
                        <Textarea
                            value={dialogProps.connectionString}
                            size="small"
                            // onChange={(_value, data) =>
                            //     handleChange(data.value)
                            // }
                            // onBlur={handleBlur}
                            // {...props}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            appearance="primary"
                            onClick={() => {
                                console.log("hi");
                            }}
                        >
                            {"Load"}
                        </Button>
                        <Button
                            appearance="secondary"
                            onClick={() => {
                                context.closeDialog();
                            }}
                        >
                            {Loc.common.cancel}
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
