import React from 'react';
import * as MUI from '@mui/material';
import { AccordionDetails, AccordionSummary, Divider, SxProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AccordionProps {
	header?: React.ReactNode;
	defaultExpanded?: boolean;
	expanded?: boolean;
	onChange?: (expanded: boolean) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Accordion = (props: AccordionProps): React.JSX.Element => {
	const render = () => {
		return (
			<MUI.Accordion
				defaultExpanded={props.defaultExpanded}
				expanded={props.expanded}
				onChange={(event: any, expanded: boolean) => props.onChange?.(expanded)}
				sx={props.sx}>
				<AccordionSummary expandIcon={<ArrowDropDownIcon />}>{props.header}</AccordionSummary>
				<Divider />
				<AccordionDetails
					sx={{
						paddingY: '1rem',
					}}>
					{props.children}
				</AccordionDetails>
			</MUI.Accordion>
		);
	};

	return render();
};
