import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined, VisibilityOff } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, ListItemIcon, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { InventoryData } from '../../../pages';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import AuthContext from '@/AuthContext';
import { useContext, useState } from 'react';

type Props = {
    data: InventoryData[];
    editInventory: (data: InventoryData) => void
    viewInventory: (data: InventoryData) => void;
    deleteInventory: (index: number) => void;
};

export default function DashboardTable({ data, editInventory, viewInventory, deleteInventory }: Props) {

    const { isAdmin } = useContext(AuthContext);
    const [disabledRows, setDisabledRows] = useState<Set<number>>(new Set());

    const toggleRowDisable = (index: number) => {
        const updatedRows = new Set(disabledRows);
        if (updatedRows.has(index)) {
            updatedRows.delete(index);
        } else {
            updatedRows.add(index);
        }
        setDisabledRows(updatedRows);
    };

    const isRowDisabled = (index: number) => {
        return disabledRows.has(index);
    };

    const getActiveRowsData = (): InventoryData[] => {
        return data.filter((_, index) => !isRowDisabled(index));
    };

    const calculateUniqueCategoryCount = (): number => {
        const activeCategories = new Set<string>();
        getActiveRowsData().forEach(item => activeCategories.add(item.category));
        return activeCategories.size;
    };
    const calculateOutOfStockCount = (): number => {
        return getActiveRowsData().filter(item => item.quantity === 0).length;
    };
    const calculateTotalProductCount = (): number => {
        return getActiveRowsData().length;
    };
    const calculateValue = (price: string, quantity: number): number => {
        const priceNumber = parseFloat(price.replace('$', ''));
        return isNaN(priceNumber) ? 0 : priceNumber * quantity;
    };

    const calculateTotalStoreValue = (): number => {
        return getActiveRowsData().reduce((total, item) => {
            return total + calculateValue(item.price, item.quantity);
        }, 0);
    };

    const deleteRow = (index: number) => {
        deleteInventory(index);
    };

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
                <Card sx={{ bgcolor: '#013220 ' }}>
                    <CardContent>
                        <div className='flex flex-col text-white'>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <ShoppingCartIcon fontSize="large" />
                            </ListItemIcon>
                            <p className='text-md'>Total product:</p>
                            <p className='text-4xl'>{calculateTotalProductCount()}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ bgcolor: '#013220 ' }}>
                    <CardContent>
                        <div className='flex flex-col text-white'>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <CurrencyExchangeIcon fontSize="large" />
                            </ListItemIcon>
                            <p className='text-md'>Total store value:</p>
                            <p className='text-4xl'>${calculateTotalStoreValue().toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ bgcolor: '#013220 ' }}>
                    <CardContent>
                        <div className='flex flex-col text-white'>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <RemoveShoppingCartIcon fontSize="large" />
                            </ListItemIcon>
                            <p className='text-md'>Out of stocks:</p>
                            <p className='text-4xl'>{calculateOutOfStockCount()}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ bgcolor: '#013220 ' }}>
                    <CardContent>
                        <div className='flex flex-col text-white'>
                            <ListItemIcon sx={{ color: 'white' }}>
                                <CategoryIcon fontSize="large" />
                            </ListItemIcon>
                            <p className='text-md'>No of Category:</p>
                            <p className='text-4xl'>{calculateUniqueCategoryCount()}</p>
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <br />
            <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: '#141414' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#141414' }}>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>Value</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#141414', color: '#90EE90' }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((el, index) => (
                                <TableRow key={index} sx={{ bgcolor: isRowDisabled(index) ? '#CCCCCC' : 'transparent' }}>
                                    <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                                        {el.name}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }}>{el.category}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>
                                        {el.price}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }}>{el.quantity}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>${calculateValue(el.price, el.quantity)}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit" followCursor>
                                            <IconButton
                                                size="small"
                                                sx={{ color: 'green', mr: 0.5 }}
                                                disabled={isRowDisabled(index) || isAdmin}
                                                onClick={() => {
                                                    editInventory(el as InventoryData); // Call editInventory function
                                                    viewInventory(el as InventoryData); // Open dialog for editing
                                                }}
                                                children={<EditOutlined fontSize="small" />}
                                            />
                                        </Tooltip>
                                        <Tooltip title={isRowDisabled(index) ? "Enable" : "Disable"} followCursor>
                                            <IconButton
                                                size="small"
                                                sx={{ color: 'purple', mr: 0.5 }}
                                                disabled={isAdmin}
                                                onClick={() => toggleRowDisable(index)}
                                                children={isRowDisabled(index) ? <VisibilityOff /> : <RemoveRedEyeOutlined />}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Delete" followCursor>
                                            <IconButton
                                                size="small"
                                                sx={{ color: 'red', mr: 0.5 }}
                                                disabled={isRowDisabled(index) || isAdmin}
                                                onClick={() => deleteRow(index)}
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
