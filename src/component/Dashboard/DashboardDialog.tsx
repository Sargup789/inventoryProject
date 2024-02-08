import { HighlightOff } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { InventoryData } from "../../../pages";

interface InventoryDialogProps {
    open: boolean;
    handleClose: () => void;
    isViewMode: boolean;
    inventoryDialogData: InventoryData | {};
    onSubmit: (values: InventoryData) => void;
}

const DashboardDialog: React.FC<InventoryDialogProps> = ({
    open,
    handleClose,
    isViewMode,
    inventoryDialogData,
    onSubmit,
}) => {
    const isEditMode = Object.keys(inventoryDialogData).length > 0;

    const calculateValue = (price: string, quantity: number): number => {
        const priceNumber = parseFloat(price?.replace('$', ''));
        return isNaN(priceNumber) ? 0 : priceNumber * quantity;
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {isEditMode ? "Edit" : "View"} product : {(inventoryDialogData as InventoryData)?.name}
                </Box>
                <IconButton
                    children={<HighlightOff />}
                    color="inherit"
                    onClick={handleClose}
                    sx={{ transform: "translate(8px, -8px)" }}
                />
            </DialogTitle>
            <DialogContent>
                <Form
                    initialValues={inventoryDialogData}
                    onSubmit={onSubmit}
                    render={({ handleSubmit, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    my: 3,
                                    mx: 1,
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                    gap: 3,
                                }}
                            >
                                <Field name="category">
                                    {({ input }) => (
                                        <Box>
                                            <Typography className="label">Category</Typography>
                                            <TextField
                                                {...input}
                                                fullWidth
                                                size="small"
                                                placeholder="Enter category"
                                            />
                                        </Box>
                                    )}
                                </Field>
                                <Field name="price">
                                    {({ input }) => (
                                        <Box>
                                            <Typography className="label">Price</Typography>
                                            <TextField
                                                {...input}
                                                fullWidth
                                                size="small"
                                                placeholder="Enter price"
                                            />
                                        </Box>
                                    )}
                                </Field>
                                <Field name="quantity">
                                    {({ input }) => (
                                        <Box>
                                            <Typography className="label">
                                                Quantity
                                            </Typography>
                                            <TextField
                                                {...input}
                                                fullWidth
                                                size="small"
                                                placeholder="Enter quantity"
                                            />
                                        </Box>
                                    )}
                                </Field>
                                <Field name="value">
                                    {({ input }) => (
                                        <Box>
                                            <Typography className="label">Value</Typography>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={calculateValue(values.price, values.quantity)}
                                                placeholder="Enter value"
                                            />
                                        </Box>
                                    )}
                                </Field>
                            </Box>
                            <DialogActions>
                                {!isViewMode && <Button
                                    style={{
                                        borderRadius: 15,
                                        backgroundColor: "#90EE90",
                                        fontSize: "13px"
                                    }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Save
                                </Button>}
                            </DialogActions>
                        </form>
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default DashboardDialog;
