import React from 'react';
import * as MUI from '@mui/material';
import { AccordionDetails, AccordionSummary, SxProps } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AccordionProps {
	header?: React.ReactNode;
	defaultExpanded?: boolean;
	expanded?: boolean;
	onChange?: (event: any, expanded: boolean) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const Accordion = (props: AccordionProps): JSX.Element => {
	const render = () => {
		return (
			<MUI.Accordion
				defaultExpanded={props.defaultExpanded}
				expanded={props.expanded}
				onChange={props.onChange}
				sx={props.sx}>
				<AccordionSummary expandIcon={<ArrowDropDownIcon />}>{props.header}</AccordionSummary>
				<AccordionDetails>{props.children}</AccordionDetails>
			</MUI.Accordion>
		);
	};

	return render();
};
