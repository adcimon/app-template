import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type SearchFieldProps = TextFieldProps & {
	onSearch?: (query: string) => void;
};

export const SearchField: React.FC<SearchFieldProps> = ({ onSearch, ...props }: SearchFieldProps): JSX.Element => {
	const [value, setValue] = React.useState<string>('');

	const handleChange = (event: any) => {
		props.onChange?.(event);
		setValue(event.target.value);
	};

	const handleKeyDown = (event: any) => {
		props.onKeyDown?.(event);

		if (value === '') {
			return;
		}

		if (event.key === 'Enter') {
			onSearch?.(value);
		}
	};

	const handleClear = () => {
		setValue('');
	};

	const render = () => {
		return (
			<>
				<TextField
					{...props}
					value={value}
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
								{value !== '' && <IconButton onClick={handleClear}>{<CloseIcon />}</IconButton>}
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
