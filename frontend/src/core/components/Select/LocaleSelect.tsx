import React from 'react';
import { Autocomplete, Box, InputAdornment, TextField, TextFieldProps, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

type LocaleSelectProps = TextFieldProps & {
	disableClearable?: boolean;
};

export interface LocaleType {
	code: string;
	label: string;
}

export const LocaleSelect = ({ disableClearable, ...props }: LocaleSelectProps): React.JSX.Element => {
	const render = () => {
		const defaultValue =
			locales[locales.findIndex((locale: LocaleType) => locale.code === props.defaultValue)] || null;
		const value = locales[locales.findIndex((locale: LocaleType) => locale.code === props.value)] || null;
		return (
			<Autocomplete
				defaultValue={defaultValue}
				value={value ?? defaultValue}
				onChange={(event: any, value: any) => props.onChange?.({ ...event, target: { value: value } })}
				options={locales}
				disabled={props.disabled}
				disableClearable={disableClearable}
				getOptionLabel={(option) => option.label}
				renderOption={(props, option) => {
					const { key, ...subprops } = props;
					return (
						<Box
							key={key}
							component='li'
							{...subprops}>
							<Typography>{option.label}</Typography>
							<Typography
								sx={{
									color: 'neutral.main',
									fontSize: '0.8rem',
									marginLeft: '0.25rem',
								}}>
								{`(${option.code})`}
							</Typography>
						</Box>
					);
				}}
				renderInput={(params) => {
					const { defaultValue, value, onChange, ...subprops } = props;
					return (
						<TextField
							{...params}
							{...subprops}
							label={props.label ?? 'Locale'}
							slotProps={{
								input: {
									...params.InputProps,
									...props.slotProps?.input,
									startAdornment: (
										<InputAdornment
											position='start'
											sx={{
												marginRight: '2px !important',
												marginTop: '0 !important',
											}}>
											<PublicIcon fontSize='small' />
										</InputAdornment>
									),
									sx: {
										...props.sx,
										height: '100%',
									},
								},
								htmlInput: {
									...params.inputProps,
									...props.slotProps?.htmlInput,
									autoComplete: 'new-password', // Disable autocomplete and autofill.
								},
							}}
						/>
					);
				}}
				sx={props.sx}
			/>
		);
	};

	return render();
};

// BCP 47 Language Tags (https://datatracker.ietf.org/doc/html/rfc5646).
// Material UI Supported Locales (https://mui.com/material-ui/guides/localization/).
export const locales: LocaleType[] = [
	{
		label: 'Amharic',
		code: 'am-ET',
	},
	{
		label: 'Arabic (Egypt)',
		code: 'ar-EG',
	},
	{
		label: 'Arabic (Saudi Arabia)',
		code: 'ar-SA',
	},
	{
		label: 'Arabic (Sudan)',
		code: 'ar-SD',
	},
	{
		label: 'Armenian',
		code: 'hy-AM',
	},
	{
		label: 'Azerbaijani',
		code: 'az-AZ',
	},
	{
		label: 'Bangla',
		code: 'bn-BD',
	},
	{
		label: 'Bulgarian',
		code: 'bg-BG',
	},
	{
		label: 'Catalan',
		code: 'ca-ES',
	},
	{
		label: 'Chinese (Hong Kong)',
		code: 'zh-HK',
	},
	{
		label: 'Chinese (Simplified)',
		code: 'zh-CN',
	},
	{
		label: 'Chinese (Taiwan)',
		code: 'zh-TW',
	},
	{
		label: 'Croatian',
		code: 'hr-HR',
	},
	{
		label: 'Czech',
		code: 'cs-CZ',
	},
	{
		label: 'Danish',
		code: 'da-DK',
	},
	{
		label: 'Dutch',
		code: 'nl-NL',
	},
	{
		label: 'English (United Kingdom)',
		code: 'en-UK',
	},
	{
		label: 'English (United States)',
		code: 'en-US',
	},
	{
		label: 'Estonian',
		code: 'et-EE',
	},
	{
		label: 'Finnish',
		code: 'fi-FI',
	},
	{
		label: 'French',
		code: 'fr-FR',
	},
	{
		label: 'German',
		code: 'de-DE',
	},
	{
		label: 'Greek',
		code: 'el-GR',
	},
	{
		label: 'Hebrew',
		code: 'he-IL',
	},
	{
		label: 'Hindi',
		code: 'hi-IN',
	},
	{
		label: 'Hungarian',
		code: 'hu-HU',
	},
	{
		label: 'Icelandic',
		code: 'is-IS',
	},
	{
		label: 'Indonesian',
		code: 'id-ID',
	},
	{
		label: 'Italian',
		code: 'it-IT',
	},
	{
		label: 'Japanese',
		code: 'ja-JP',
	},
	{
		label: 'Khmer',
		code: 'kh-KH',
	},
	{
		label: 'Kazakh',
		code: 'kk-KZ',
	},
	{
		label: 'Korean',
		code: 'ko-KR',
	},
	{
		label: 'Kurdish (Central)',
		code: 'ku-CKB',
	},
	{
		label: 'Macedonian',
		code: 'mk-MK',
	},
	{
		label: 'Myanmar',
		code: 'my-MY',
	},
	{
		label: 'Malay',
		code: 'ms-MS',
	},
	{
		label: 'Nepali',
		code: 'ne-NP',
	},
	{
		label: 'Norwegian (bokmål)',
		code: 'nb-NO',
	},
	{
		label: 'Norwegian (nynorsk)',
		code: 'nn-NO',
	},
	{
		label: 'Pashto (Afghanistan)',
		code: 'ps-AF',
	},
	{
		label: 'Persian',
		code: 'fa-IR',
	},
	{
		label: 'Polish',
		code: 'pl-PL',
	},
	{
		label: 'Portuguese',
		code: 'pt-PT',
	},
	{
		label: 'Portuguese (Brazil)',
		code: 'pt-BR',
	},
	{
		label: 'Romanian',
		code: 'ro-RO',
	},
	{
		label: 'Russian',
		code: 'ru-RU',
	},
	{
		label: 'Serbian',
		code: 'sr-RS',
	},
	{
		label: 'Sinhalese',
		code: 'si-LK',
	},
	{
		label: 'Slovak',
		code: 'sk-SK',
	},
	{
		label: 'Spanish',
		code: 'es-ES',
	},
	{
		label: 'Swedish',
		code: 'sv-SE',
	},
	{
		label: 'Thai',
		code: 'th-TH',
	},
	{
		label: 'Turkish',
		code: 'tr-TR',
	},
	{
		label: 'Tagalog',
		code: 'tl-TL',
	},
	{
		label: 'Ukrainian',
		code: 'uk-UA',
	},
	{
		label: 'Urdu (Pakistan)',
		code: 'ur-PK',
	},
	{
		label: 'Vietnamese',
		code: 'vi-VN',
	},
];
