import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const PasswordField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const handleMouseLeave = (event: any) => {
		props.onMouseLeave?.(event);
		setShowPassword(false);
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const render = () => {
		return (
			<>
				<TextField
					{...props}
					type={showPassword ? 'text' : 'password'}
					onMouseLeave={handleMouseLeave}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={handleShowPassword}
									onMouseDown={handleShowPassword}>
									{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</>
		);
	};

	return render();
};
