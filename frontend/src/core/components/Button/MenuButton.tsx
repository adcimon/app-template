import React from 'react';
import { Box, ButtonBase, Tooltip, Typography } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';
import { useBreakpointDown } from '../../hooks/useBreakpoint';

interface MenuButtonProps {
	ref?: React.Ref<HTMLButtonElement>;
	title?: string;
	tooltip?: string;
	icon?: React.ReactElement;
	count?: number;
	alert?: boolean;
	active?: boolean;
	// primary: theme colors (default). inherit: takes the color of where it is placed (e.g. a colored app bar).
	color?: 'primary' | 'inherit';
	onClick?: (event: any) => void;
}

export const MenuButton = (props: MenuButtonProps): React.JSX.Element => {
	const isBreakpoint: boolean = useBreakpointDown();

	const [highlighted, setHighlighted] = React.useState<boolean>(false);

	const inherit: boolean = props.color === 'inherit';

	const getBackground = (theme: Theme): string => {
		if (inherit) {
			const amount: number = props.active ? (highlighted ? 26 : 18) : highlighted ? 10 : 0;
			return amount > 0 ? `color-mix(in srgb, currentColor ${amount}%, transparent)` : 'transparent';
		}

		if (props.active) {
			return alpha(theme.palette.primary.main, highlighted ? 0.26 : 0.18);
		}

		return highlighted ? alpha(theme.palette.text.primary, 0.1) : 'transparent';
	};

	const getIconColor = (): string => {
		if (inherit) {
			return 'inherit';
		}

		return props.active ? 'primary.main' : 'text.primary';
	};

	const getTitleColor = (): string => {
		if (inherit) {
			return 'inherit';
		}

		return props.active ? 'primary.main' : 'text.secondary';
	};

	const renderCount = () => {
		if (!props.count) {
			return <></>;
		}

		return (
			<Box
				sx={{
					alignItems: 'center',
					backgroundColor: props.alert ? 'error.main' : 'background.paper',
					border: props.alert ? 'none' : 1,
					borderColor: 'divider',
					borderRadius: '9px',
					boxShadow: (theme: Theme) => (props.alert ? `0 0 0 2px ${theme.palette.background.paper}` : 'none'),
					color: props.alert ? 'error.contrastText' : 'text.secondary',
					display: 'flex',
					fontSize: '11px',
					fontWeight: props.alert ? 700 : 600,
					height: '18px',
					justifyContent: 'center',
					minWidth: '18px',
					paddingX: '5px',
					pointerEvents: 'none',
					position: 'absolute',
					right: '-6px',
					top: '-5px',
				}}>
				{props.count}
			</Box>
		);
	};

	const renderTitle = () => {
		if (isBreakpoint || !props.title) {
			return <></>;
		}

		return (
			<Typography
				noWrap={true}
				sx={{
					color: getTitleColor(),
					fontSize: '11px',
					fontWeight: 500,
					lineHeight: 1.2,
				}}>
				{props.title}
			</Typography>
		);
	};

	const render = () => {
		return (
			<Tooltip
				title={props.tooltip}
				placement='bottom'
				slotProps={{
					popper: {
						modifiers: [
							{
								name: 'offset',
								options: {
									offset: [0, -10],
								},
							},
						],
					},
				}}>
				<ButtonBase
					ref={props.ref}
					disableRipple={true}
					onClick={props.onClick}
					onMouseEnter={() => setHighlighted(true)}
					onMouseLeave={() => setHighlighted(false)}
					onFocusVisible={() => setHighlighted(true)}
					onBlur={() => setHighlighted(false)}
					sx={{
						borderRadius: '12px',
						flexDirection: 'column',
						gap: '4px',
						minWidth: isBreakpoint || !props.title ? undefined : '72px',
					}}>
					<Box
						sx={{
							alignItems: 'center',
							backgroundColor: (theme: Theme) => getBackground(theme),
							borderRadius: '12px',
							color: getIconColor(),
							display: 'flex',
							height: '44px',
							justifyContent: 'center',
							position: 'relative',
							transition: 'background-color 150ms',
							width: '44px',
						}}>
						{props.icon}
						{renderCount()}
					</Box>
					{renderTitle()}
				</ButtonBase>
			</Tooltip>
		);
	};

	return render();
};
