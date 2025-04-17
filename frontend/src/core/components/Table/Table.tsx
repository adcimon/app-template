import React from 'react';
import * as MUI from '@mui/material';
import {
	Box,
	Card,
	IconButton,
	Stack,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationDialog } from '../Dialog/ConfirmationDialog';

const RowsPerPageRange = [5, 10, 25] as const;
type RowsPerPageType = (typeof RowsPerPageRange)[number];

interface TableProps<T> {
	title?: React.ReactNode;
	itemName?: string;
	items: T[];
	head?: React.ReactNode[];
	row?: (item: T) => React.ReactNode[];
	dialog?: React.ReactNode;
	deleteDialog?: React.ReactNode;
	validate?: () => boolean;
	rowsPerPage?: RowsPerPageType;
	onSelect?: (item: T) => void;
	onDeselect?: () => void;
	onCreate?: () => Promise<boolean>;
	onUpdate?: (item: T) => Promise<boolean>;
	onDelete?: (item: T) => Promise<boolean>;
}

export const Table = <T,>(props: TableProps<T>): React.JSX.Element => {
	const itemName: string = props.itemName || '';
	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(props.rowsPerPage || RowsPerPageRange[0]);
	const [item, setItem] = React.useState<T>();
	const [openItemDialog, setOpenItemDialog] = React.useState<boolean>(false);
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);

	const applyPagination = (records: any[], page: number, rowsPerPage: number): any[] => {
		return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	};

	const handleClickRow = (item: T) => {
		props.onSelect?.(item);
		setItem(item);
		setOpenItemDialog(true);
	};

	const handleAcceptDialog = async () => {
		if (!item) {
			const created: boolean | undefined = await props.onCreate?.();
			if (created === false) {
				return;
			}
		} else {
			const updated: boolean | undefined = await props.onUpdate?.(item);
			if (updated === false) {
				return;
			}
		}

		setOpenItemDialog(false);
	};

	const handleCloseDialog = () => {
		props.onDeselect?.();
		setOpenItemDialog(false);
	};

	const handleAdd = () => {
		setItem(undefined);
		setOpenItemDialog(true);
	};

	const handleDelete = () => {
		setOpenDeleteDialog(true);
	};

	const handleAcceptDelete = async () => {
		const deleted: boolean | undefined = await props.onDelete?.(item as T);
		if (deleted === false) {
			return;
		}

		setOpenItemDialog(false);
		setOpenDeleteDialog(false);
		setItem(undefined);
	};

	const handleCancelDelete = () => {
		setOpenDeleteDialog(false);
	};

	const handlePageChange = async (event: any, page: number) => {
		setPage(page);
	};

	const handleRowsPerPageChange = async (event: any) => {
		const rowsPerPage: number = parseInt(event.target.value);
		setPage(0);
		setRowsPerPage(rowsPerPage);
	};

	const render = () => {
		return (
			<>
				<Stack
					direction='column'
					spacing={2}
					sx={{
						alignContent: 'center',
						justifyContent: 'center',
						width: '100%',
					}}>
					{props.title && <Box>{props.title}</Box>}
					<Card>
						<MUI.Table>
							<TableHead>
								<TableRow>
									{props.head?.map((node: React.ReactNode, index: number) => {
										return <TableCell key={index}>{node}</TableCell>;
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{applyPagination(props.items, page, rowsPerPage).map((item: T, index: number) => {
									return (
										<TableRow
											key={index}
											onClick={() => handleClickRow(item)}
											hover
											sx={{
												cursor: 'pointer',
											}}>
											{props.row
												? props.row(item).map((node: React.ReactNode, index: number) => {
														return <TableCell key={index}>{node}</TableCell>;
												  })
												: undefined}
										</TableRow>
									);
								})}
							</TableBody>
						</MUI.Table>
						<Stack
							direction='row'
							sx={{
								alignItems: 'center',
								justifyContent: props.onCreate ? 'space-between' : 'flex-end',
								width: '100%',
							}}>
							{props.onCreate && (
								<IconButton
									onClick={handleAdd}
									sx={{
										marginLeft: '10px',
									}}>
									<AddIcon fontSize='inherit' />
								</IconButton>
							)}
							<TablePagination
								component='div'
								count={props.items.length}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								page={page}
								rowsPerPage={rowsPerPage}
								rowsPerPageOptions={Array.from(RowsPerPageRange)}
							/>
						</Stack>
					</Card>
				</Stack>
				<ConfirmationDialog
					title={
						<>
							<Stack
								direction='row'
								sx={{
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '100%',
								}}>
								<Typography
									sx={{
										fontWeight: 'bold',
									}}>
									{!item ? `New ${itemName}` : `${itemName}`}
								</Typography>
								{item && props.onDelete && (
									<IconButton
										onClick={handleDelete}
										sx={{
											color: 'neutral.light',
										}}>
										<DeleteIcon />
									</IconButton>
								)}
							</Stack>
						</>
					}
					open={openItemDialog}
					acceptable={props.validate ? props.validate() : true}
					onAccept={handleAcceptDialog}
					onCancel={props.onUpdate ? handleCloseDialog : undefined}
					onClose={handleCloseDialog}>
					<Stack
						direction='column'
						spacing={2}>
						{props.dialog}
					</Stack>
				</ConfirmationDialog>
				<ConfirmationDialog
					title='Delete'
					variant='warning'
					open={openDeleteDialog}
					onAccept={handleAcceptDelete}
					onCancel={handleCancelDelete}
					onClose={handleCancelDelete}>
					{props.deleteDialog ? props.deleteDialog : <Typography>Do you want to delete it?</Typography>}
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};
