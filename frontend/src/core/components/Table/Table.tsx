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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DroppableProvided,
	DropResult,
} from '@hello-pangea/dnd';
import { ConfirmationDialog } from '../Dialog/ConfirmationDialog';

const RowsPerPageRange = [5, 10, 25] as const;
type RowsPerPageType = (typeof RowsPerPageRange)[number];

interface TableProps<T> {
	title?: React.ReactNode;
	head?: React.ReactNode[];
	itemName?: string;
	items: T[];
	rowsPerPage?: RowsPerPageType;
	getId?: (item: T) => string;

	renderRow?: (item: T) => React.ReactNode[];

	renderDialog?: () => React.ReactNode;
	renderDeleteDialog?: () => React.ReactNode;

	onValidate?: () => boolean;
	onSelect?: (item: T) => void;
	onDeselect?: () => void;
	onCreate?: () => Promise<boolean> | boolean;
	onUpdate?: (item: T) => Promise<boolean> | boolean;
	onReorder?: (sourceIndex: number, destinationIndex: number) => Promise<boolean> | boolean;
	onDelete?: (item: T) => Promise<boolean> | boolean;
}

export const Table = <T,>(props: TableProps<T>): React.JSX.Element => {
	const itemName: string = props.itemName || '';

	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(props.rowsPerPage || RowsPerPageRange[0]);

	const [item, setItem] = React.useState<T>();
	const [openItemDialog, setOpenItemDialog] = React.useState<boolean>(false);
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);

	const applyPagination = (records: T[], page: number, rowsPerPage: number): T[] => {
		return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	};

	const handleDragEnd = async (result: DropResult) => {
		if (!props.onReorder) {
			return;
		}

		const { source, destination } = result;

		if (!destination) {
			return;
		}

		if (source.index === destination.index) {
			return;
		}

		await props.onReorder(source.index, destination.index);
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

	const handlePageChange = (event: any, page: number) => {
		setPage(page);
	};

	const handleRowsPerPageChange = (event: any) => {
		const rowsPerPage: number = parseInt(event.target.value);
		setPage(0);
		setRowsPerPage(rowsPerPage);
	};

	const renderTable = () => {
		const paginatedItems: T[] = applyPagination(props.items, page, rowsPerPage);
		return (
			<>
				{props.onReorder ? (
					<DragDropContext onDragEnd={handleDragEnd}>
						<MUI.Table>
							<TableHead>
								<TableRow>
									{/* Drag handle header cell */}
									<TableCell
										sx={{
											width: '50px',
										}}
									/>
									{/* Header cells */}
									{props.head?.map((node: React.ReactNode, index: number) => (
										<TableCell key={index}>{node}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<Droppable
								droppableId='table'
								direction='vertical'>
								{(provided: DroppableProvided) => (
									<TableBody
										ref={provided.innerRef}
										{...provided.droppableProps}>
										{paginatedItems.map((item: T, index: number) => {
											const globalIndex: number = page * rowsPerPage + index;
											const id: string = props.getId?.(item) ?? globalIndex.toString();
											return (
												<Draggable
													key={id}
													draggableId={id}
													index={globalIndex}>
													{(
														provided: DraggableProvided,
														snapshot: DraggableStateSnapshot,
													) => (
														<TableRow
															ref={provided.innerRef}
															{...provided.draggableProps}
															hover={true}
															onClick={() => handleClickRow(item)}
															sx={{
																backgroundColor: snapshot.isDragging
																	? 'action.hover'
																	: undefined,
																cursor: 'pointer',
															}}>
															{/* Drag handle cell */}
															<TableCell
																{...provided.dragHandleProps}
																onClick={(event: any) => event.stopPropagation()}
																sx={{
																	cursor: 'grab',
																}}>
																<DragIndicatorIcon />
															</TableCell>
															{/* Data cells */}
															{props
																.renderRow?.(item)
																.map((node: React.ReactNode, index: number) => (
																	<TableCell key={index}>{node}</TableCell>
																))}
														</TableRow>
													)}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</TableBody>
								)}
							</Droppable>
						</MUI.Table>
					</DragDropContext>
				) : (
					<MUI.Table>
						<TableHead>
							<TableRow>
								{props.head?.map((node: React.ReactNode, index: number) => (
									<TableCell key={index}>{node}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedItems.map((item: T, index: number) => (
								<TableRow
									key={index}
									hover={true}
									onClick={() => handleClickRow(item)}
									sx={{
										cursor: 'pointer',
									}}>
									{props.renderRow?.(item).map((node: React.ReactNode, index: number) => (
										<TableCell key={index}>{node}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</MUI.Table>
				)}
			</>
		);
	};

	const render = () => {
		return (
			<>
				<Stack
					direction='column'
					sx={{
						alignContent: 'center',
						justifyContent: 'center',
						width: '100%',
					}}>
					{props.title && <Box>{props.title}</Box>}
					<Card>
						{renderTable()}
						<Stack
							direction='row'
							sx={{
								alignItems: 'center',
								justifyContent: props.onCreate ? 'space-between' : 'flex-end',
								width: '100%',
							}}>
							{/* Add button */}
							{props.onCreate && (
								<IconButton
									onClick={handleAdd}
									sx={{
										marginLeft: '10px',
									}}>
									<AddIcon fontSize='inherit' />
								</IconButton>
							)}
							{/* Pagination */}
							<TablePagination
								component='div'
								count={props.items.length}
								page={page}
								rowsPerPage={rowsPerPage}
								onPageChange={handlePageChange}
								onRowsPerPageChange={handleRowsPerPageChange}
								rowsPerPageOptions={Array.from(RowsPerPageRange)}
							/>
						</Stack>
					</Card>
				</Stack>
				{/* Create/update dialog */}
				<ConfirmationDialog
					title={<Typography>{!item ? `New ${itemName}` : `${itemName}`}</Typography>}
					headerActions={
						item &&
						props.onDelete && (
							<IconButton onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
						)
					}
					open={openItemDialog}
					acceptable={props.onValidate ? props.onValidate() : true}
					onAccept={handleAcceptDialog}
					onCancel={props.onUpdate ? handleCloseDialog : undefined}
					onClose={handleCloseDialog}>
					<Stack
						direction='column'
						sx={{
							gap: '0.75rem',
						}}>
						{props.renderDialog?.()}
					</Stack>
				</ConfirmationDialog>
				{/* Delete dialog */}
				<ConfirmationDialog
					title='Delete'
					variant='warning'
					open={openDeleteDialog}
					onAccept={handleAcceptDelete}
					onCancel={handleCancelDelete}
					onClose={handleCancelDelete}>
					{props.renderDeleteDialog ? (
						props.renderDeleteDialog()
					) : (
						<Typography>Do you want to delete it?</Typography>
					)}
				</ConfirmationDialog>
			</>
		);
	};

	return render();
};
