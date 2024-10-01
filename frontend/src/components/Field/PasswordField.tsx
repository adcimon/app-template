import React from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IPasswordFieldState {
	showPassword: boolean;
}

export const PasswordField: React.FC<TextFieldProps> = (props: TextFieldProps): JSX.Element => {
	const [state, setState] = React.useState<IPasswordFieldState>({
		showPassword: false,
	});

	const handleMouseLeave = (event: any) => {
		props.onMouseLeave?.(event);
		setState({
			...state,
			showPassword: false,
		});
	};

	const handleShowPassword = () => {
		setState({
			...state,
			showPassword: !state.showPassword,
		});
	};

	const render = () => {
		return (
			<>
				<TextField
					{...props}
					type={state.showPassword ? 'text' : 'password'}
					onMouseLeave={handleMouseLeave}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={handleShowPassword}
									onMouseDown={handleShowPassword}>
									{state.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
