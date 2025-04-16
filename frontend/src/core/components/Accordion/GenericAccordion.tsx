import React from 'react';
import { SxProps } from '@mui/system';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface GenericAccordionProps {
	header?: React.ReactNode;
	defaultExpanded?: boolean;
	expanded?: boolean;
	onChange?: (event: any, expanded: boolean) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericAccordion = (props: GenericAccordionProps): JSX.Element => {
	const render = () => {
		return (
			<Accordion
				defaultExpanded={props.defaultExpanded}
				expanded={props.expanded}
				onChange={props.onChange}
				sx={props.sx}>
				<AccordionSummary expandIcon={<ArrowDropDownIcon />}>{props.header}</AccordionSummary>
				<AccordionDetails>{props.children}</AccordionDetails>
			</Accordion>
		);
	};

	return render();
};
