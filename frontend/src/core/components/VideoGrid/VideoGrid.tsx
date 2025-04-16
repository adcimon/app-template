import React from 'react';
import { Box, keyframes } from '@mui/material';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface VideoGridProps {
	aspectRatio?: number;
	tileMargin?: number;
	children?: React.ReactElement | Array<React.ReactElement>;
}

export const VideoGrid = (props: VideoGridProps): JSX.Element => {
	const aspectRatio: number = props.aspectRatio ?? 4 / 3;
	const tileMargin: number = props.tileMargin ?? 5;
	const gridRef = React.useRef<HTMLDivElement>(null);

	const windowSize = useWindowSize();

	const visibilityObserver = useIntersectionObserver({
		threshold: 0,
	});

	const [tileSize, setTileSize] = React.useState({
		width: 0,
		height: 0,
	});

	React.useEffect(() => {
		resize();
	}, [windowSize, visibilityObserver.isIntersecting, props.children]);

	const getTileCount = (): number => {
		return React.Children.count(props.children);
	};

	const getGridSize = () => {
		const width: number = (gridRef?.current?.offsetWidth ?? 0) - tileMargin * 2;
		const height: number = (gridRef?.current?.offsetHeight ?? 0) - tileMargin * 2;
		return { width, height };
	};

	const calculateArea = (
		width: number,
		height: number,
		ratio: number,
		count: number,
		margin: number,
		increment: number,
	) => {
		let i: number = 0;
		let w: number = 0;
		let h: number = increment / ratio + margin * 2;

		while (i < count) {
			if (w + increment > width) {
				w = 0;
				h = h + increment / ratio + margin * 2;
			}
			w = w + increment + margin * 2;
			i++;
		}

		if (h > height || increment > width) {
			return false;
		} else {
			return increment;
		}
	};

	const resize = () => {
		const tileCount: number = getTileCount();
		const gridSize = getGridSize();

		// Try to cover the grid area with the maximum number of tiles.
		let maxWidth: number = 0;
		let i: number = 1;
		while (i < 5000) {
			const area: number | false = calculateArea(
				gridSize.width,
				gridSize.height,
				aspectRatio,
				tileCount,
				tileMargin,
				i,
			);
			if (area === false) {
				maxWidth = i - 1;
				break;
			}
			i++;
		}

		// Remove margins.
		maxWidth = maxWidth - tileMargin * 2;

		setTileSize({
			width: maxWidth,
			height: maxWidth / aspectRatio,
		});
	};

	const renderTiles = () => {
		const animation = keyframes`
			from {
				opacity: 0;
				transform: scale(0.4) translateY(20px);
			}
			to {
				opacity: 1;
				transform: scale(1) translateY(0);
			}
		`;
		if (props.children) {
			return React.Children.map(props.children, (child: React.ReactElement, index: number) => {
				return (
					<Box
						key={index}
						sx={{
							alignSelf: 'center',
							animation: `${animation} 0.4s ease`,
							display: 'inline-block',
							height: tileSize.height + 'px',
							margin: tileMargin + 'px',
							overflow: 'hidden',
							position: 'relative',
							verticalAlign: 'middle',
							width: tileSize.width + 'px',
						}}>
						{child}
					</Box>
				);
			});
		}
	};

	const render = () => {
		return (
			<Box
				ref={visibilityObserver.ref}
				sx={{
					display: 'flex',
					flex: '1',
					height: '100%',
					width: '100%',
				}}>
				<Box
					ref={gridRef}
					sx={{
						alignContent: 'center',
						alignItems: 'center',
						display: 'flex',
						flex: '1',
						flexWrap: 'wrap',
						justifyContent: 'center',
						overflow: 'auto',
						verticalAlign: 'middle',
					}}>
					{renderTiles()}
				</Box>
			</Box>
		);
	};

	return render();
};
