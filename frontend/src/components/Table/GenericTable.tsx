import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ConfirmationDialog } from '../Dialog/ConfirmationDialog';
import { GenericDialog } from '../Dialog/GenericDialog';

interface IGenericTableProps {
	title?: React.ReactNode;
	items: any[];
	head?: () => React.ReactNode[];
	row?: (item: any) => React.ReactNode[];
	dialog?: React.ReactNode;
	validate?: () => boolean;
	onSelect?: (item: any) => void;
	onDeselect?: () => void;
	onCreate?: () => Promise<boolean>;
	onUpdate?: (item: any) => Promise<boolean>;
	onDelete?: (item: any) => Promise<boolean>;
}

interface IGenericTableState {
	openItemDialog: boolean;
	openDeleteDialog: boolean;
	page: number;
	rowsPerPage: number;
	item: any;
}

export const GenericTable: React.FC<IGenericTableProps> = (props: IGenericTableProps): JSX.Element => {
	const [state, setState] = React.useState<IGenericTableState>({
		openItemDialog: false,
		openDeleteDialog: false,
		page: 0,
		rowsPerPage: 5,
		item: null,
	});

	const applyPagination = (records: any[], page: number, rowsPerPage: number): any[] => {
		return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	};

	const handleClickRow = (item: any) => {
		if (props.onSelect) {
			props.onSelect(item);
		}

		setState({
			...state,
			openItemDialog: true,
			item: item,
		});
	};

	const handleAcceptDialog = async () => {
		if (!state.item) {
			if (props.onCreate) {
				const created: boolean = await props.onCreate();
				if (!created) {
					return;
				}
			}
		} else {
			if (props.onUpdate) {
				const updated: boolean = await props.onUpdate(state.item);
				if (!updated) {
					return;
				}
			}
		}

		setState({
			...state,
			openItemDialog: false,
		});
	};

	const handleCloseDialog = () => {
		if (props.onDeselect) {
			props.onDeselect();
		}

		setState({
			...state,
			openItemDialog: false,
		});
	};

	const handleAdd = () => {
		setState({
			...state,
			openItemDialog: true,
			item: null,
		});
	};

	const handleDelete = () => {
		setState({
			...state,
			openDeleteDialog: true,
		});
	};

	const handleAcceptDelete = async () => {
		if (props.onDelete) {
			const deleted: boolean = await props.onDelete(state.item);
			if (!deleted) {
				return;
			}
		}

		setState({
			...state,
			openItemDialog: false,
			openDeleteDialog: false,
			item: null,
		});
	};

	const handleCancelDelete = () => {
		setState({
			...state,
			openDeleteDialog: false,
		});
	};

	const handlePageChange = async (event: any, page: number) => {
		setState({
			...state,
			page: page,
		});
	};

	const handleRowsPerPageChange = async (event: any) => {
		setState({
			...state,
			page: 0,
			rowsPerPage: parseInt(event.target.value),
		});
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
					}}>
					{props.title && <Box>{props.title}</Box>}
					<Card>
						<Box
							sx={{
								overflowX: 'auto',
							}}>
							<Table>
								<TableHead>
									<TableRow>
										{props.head
											? props.head().map((node: React.ReactNode, index: number) => {
													return <TableCell key={index}>{node}</TableCell>;
											  })
											: null}
									</TableRow>
								</TableHead>
								<TableBody>
									{applyPagination(props.items, state.page, state.rowsPerPage).map(
										(item: any, index: number) => {
											return (
												<TableRow
													key={index}
													onClick={() => handleClickRow(item)}
													hover
													sx={{
														cursor: 'pointer',
													}}>
													{props.row
														? props
																.row(item)
																.map((node: React.ReactNode, index: number) => {
																	return <TableCell key={index}>{node}</TableCell>;
																})
														: null}
												</TableRow>
											);
										},
									)}
								</TableBody>
							</Table>
						</Box>
						<Stack
							direction='row'
							sx={{
								alignItems: 'center',
								justifyContent: props.onCreate ? 'space-between' : 'flex-end',
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
								page={state.page}
								rowsPerPage={state.rowsPerPage}
								rowsPerPageOptions={[5, 10, 25]}
							/>
						</Stack>
					</Card>
				</Stack>
				<GenericDialog
					open={state.openItemDialog}
					onClose={handleCloseDialog}>
					<Box
						sx={{
							margin: -1.5,
							padding: 2,
						}}>
						<Stack
							direction='column'
							spacing={3}>
							<Stack
								direction='row'
								sx={{
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '100%',
								}}>
								<Typography variant='h5'>
									{!state.item ? 'New' : props.onUpdate ? 'Edit' : 'Inspect'}
								</Typography>
								{state.item && props.onDelete && (
									<IconButton
										onClick={handleDelete}
										sx={{
											color: 'neutral.light',
										}}>
										<DeleteIcon />
									</IconButton>
								)}
							</Stack>
							{props.dialog}
						</Stack>
					</Box>
					<DialogActions>
						{props.onUpdate && (
							<Button
								autoFocus
								onClick={handleCloseDialog}>
								Cancel
							</Button>
						)}
						<Button
							disabled={props.validate ? !props.validate() : false}
							autoFocus
							onClick={handleAcceptDialog}>
							Accept
						</Button>
					</DialogActions>
				</GenericDialog>
				<ConfirmationDialog
					open={state.openDeleteDialog}
					title='Delete'
					onAccept={handleAcceptDelete}
					onCancel={handleCancelDelete}
					onClose={handleCancelDelete}>
					<Typography>Do you want to delete it?</Typography>
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};
