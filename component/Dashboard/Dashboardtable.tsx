import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { InventoryData } from '../../pages';

type Props = {
    data: InventoryData[];
    editInventory: (data: InventoryData) => void
    viewInventory: (data: InventoryData) => void;
};

export default function DashboardTable({ data, editInventory, viewInventory }: Props) {

    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    const outOfStockCount = data.filter(item => item.quantity === 0).length;
    const totalProductCount = data.length;

    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        lg: "1fr 1fr 1fr 1fr",
                        xl: "1fr 1fr 1fr 1fr",
                    },
                    gap: 5,
                    columnGap: 4,
                    pt: 2,
                }}
            >
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            <b>Total product: {totalProductCount}</b>
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            <b>Total store value</b>
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            <b>Out of stocks: {outOfStockCount}</b>
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                            <b>No of Category: {uniqueCategories.length}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <br />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>Value</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((el) => (
                                <TableRow  >
                                    <TableCell component="th" scope="row">
                                        {el.name}
                                    </TableCell>
                                    <TableCell align='center'>{el.category}</TableCell>
                                    <TableCell align='center'>
                                        {el.price}
                                    </TableCell>
                                    <TableCell align='center'>{el.quantity}</TableCell>
                                    <TableCell align='center'>{el.value}</TableCell>
                                    <TableCell align='center'>
                                        <Tooltip title="View" followCursor>
                                            <IconButton
                                                size="small"
                                                onClick={() => viewInventory(el as InventoryData)}
                                                children={<RemoveRedEyeOutlined fontSize="small" />}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Edit" followCursor>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    mr: 0.5,
                                                }}
                                                onClick={() => editInventory(el as InventoryData)}
                                                children={<EditOutlined fontSize="small" />}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete" followCursor>
                                            <IconButton
                                                size="small"
                                                onClick={() => { }}
                                                children={<DeleteOutline fontSize="small" />}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}
