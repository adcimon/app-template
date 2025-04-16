import React from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

type SearchFieldProps = TextFieldProps & {
	onSearch?: (query: string) => void;
};

export const SearchField = ({ onSearch, ...props }: SearchFieldProps): JSX.Element => {
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
			<TextField
				{...props}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				hiddenLabel={true}
				slotProps={{
					input: {
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
					},
					inputLabel: {
						shrink: false,
					},
				}}
			/>
		);
	};

	return render();
};
