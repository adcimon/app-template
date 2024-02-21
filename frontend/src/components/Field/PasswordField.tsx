import * as React from 'react';
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

	const handleMouseLeave = () => {
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
					inputRef={props.inputRef}
					label={props.label}
					placeholder={props.placeholder}
					type={state.showPassword ? 'text' : 'password'}
					value={props.value}
					onChange={props.onChange}
					onFocus={props.onFocus}
					onMouseLeave={handleMouseLeave}
					helperText={props.helperText}
					disabled={props.disabled}
					required={props.required}
					autoFocus={props.autoFocus}
					fullWidth={props.fullWidth}
					margin={props.margin}
					variant={props.variant}
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
