import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type SearchFieldProps = TextFieldProps & {
	onSearch?: (query: string) => void;
};

interface ISearchFieldState {
	value: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({ onSearch, ...props }: SearchFieldProps): JSX.Element => {
	const [state, setState] = React.useState<ISearchFieldState>({
		value: '',
	});

	const handleChange = (event: any) => {
		props.onChange?.(event);
		setState({
			...state,
			value: event.target.value,
		});
	};

	const handleKeyDown = (event: any) => {
		props.onKeyDown?.(event);

		if (state.value === '') {
			return;
		}

		if (event.key === 'Enter') {
			onSearch?.(state.value);
		}
	};

	const handleClear = () => {
		setState({
			...state,
			value: '',
		});
	};

	const render = () => {
		return (
			<>
				<TextField
					{...props}
					value={state.value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					hiddenLabel
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								{state.value !== '' && <IconButton onClick={handleClear}>{<CloseIcon />}</IconButton>}
							</InputAdornment>
						),
					}}
					InputLabelProps={{
						shrink: false,
					}}
				/>
			</>
		);
	};

	return render();
};
