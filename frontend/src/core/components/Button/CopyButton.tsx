import React from 'react';
import { IconButton, IconButtonProps, Zoom } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Utils } from '../../utils/utils';

type CopyButtonProps = IconButtonProps & {
	text?: string;
	fontSize?: string;
};

export const CopyButton = (props: CopyButtonProps): React.JSX.Element => {
	const [success, setSuccess] = React.useState<boolean>(false);

	const handleClick = () => {
		const value: string = props.text ?? '';
		Utils.copyToClipboard(value);

		setSuccess(true);

		setTimeout(() => {
			setSuccess(false);
		}, 3000);
	};

	const render = () => {
		return (
			<>
				{!success && (
					<IconButton
						{...props}
						onClick={handleClick}
						sx={{
							...props.sx,
							marginX: '0 !important',
						}}>
						<ContentCopyIcon
							fontSize={props.size}
							sx={{
								color: 'neutral.light',
								fontSize: props.fontSize,
							}}
						/>
					</IconButton>
				)}
				{success && (
					<Zoom in={success}>
						<IconButton
							{...props}
							disableRipple={true}
							sx={{
								...props.sx,
								marginX: '0 !important',
							}}>
							<TaskAltIcon
								fontSize={props.size}
								sx={{
									color: 'success.main',
									fontSize: props.fontSize,
								}}
							/>
						</IconButton>
					</Zoom>
				)}
			</>
		);
	};

	return render();
};
