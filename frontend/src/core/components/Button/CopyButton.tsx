import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Zoom from '@mui/material/Zoom';
import { Utils } from '../../utils/utils';

type CopyButtonProps = IconButtonProps & {
	text?: string;
};

export const CopyButton = (props: CopyButtonProps): JSX.Element => {
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
						onClick={handleClick}>
						{
							<ContentCopyIcon
								fontSize='inherit'
								sx={{
									color: 'neutral.light',
								}}
							/>
						}
					</IconButton>
				)}
				{success && (
					<Zoom in={success}>
						<IconButton
							{...props}
							disableRipple>
							<TaskAltIcon
								fontSize='inherit'
								sx={{
									color: 'success.main',
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
