import React from 'react';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';

interface IPaginatorProps {
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Paginator = (props: IPaginatorProps): JSX.Element => {
	const paginationPercentageHeight: number = 8;

	const [page, setPage] = React.useState<number>(1);
	const [direction, setDirection] = React.useState<'left' | 'right'>('left');

	const getCount = (): number => {
		return React.Children.count(props.children);
	};

	const handleChangePage = (event: any, value: number) => {
		setPage(value);
		setDirection(page < value ? 'left' : 'right');
	};

	const render = () => {
		return (
			<>
				<Box sx={props.sx}>
					<Box
						sx={{
							height: `${100 - paginationPercentageHeight}%`,
							width: '100%',
						}}>
						{React.Children.map(props.children, (child: React.ReactNode, index: number) => {
							const selected: boolean = index + 1 === page;
							return (
								<Slide
									direction={direction}
									in={selected}>
									<Box
										sx={{
											display: selected ? undefined : 'none',
											height: '100%',
											width: '100%',
										}}>
										{child}
									</Box>
								</Slide>
							);
						})}
					</Box>
					<Stack
						direction='row'
						sx={{
							alignItems: 'center',
							height: `${paginationPercentageHeight}%`,
							justifyContent: 'center',
							width: '100%',
						}}>
						<Pagination
							count={getCount()}
							page={page}
							color='primary'
							showFirstButton={getCount() > 5}
							showLastButton={getCount() > 5}
							onChange={handleChangePage}
						/>
					</Stack>
				</Box>
			</>
		);
	};

	return render();
};
