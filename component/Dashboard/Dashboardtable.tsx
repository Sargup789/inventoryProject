import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

export default function DashboardTable() {

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>value</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow  >
                            <TableCell component="th" scope="row">
                                {""}
                            </TableCell>
                            <TableCell align='center'>{""}</TableCell>
                            <TableCell align='center'>
                                {""}
                            </TableCell>
                            <TableCell align='center'>{""}</TableCell>
                            <TableCell align='center'>{""}</TableCell>
                            <TableCell align='center'>
                                <Tooltip title="Edit" followCursor>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            mr: 0.5,
                                        }}
                                        onClick={() => { }}
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

                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
