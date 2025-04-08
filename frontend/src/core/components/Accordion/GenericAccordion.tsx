import React from 'react';
import { SxProps } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IGenericAccordionProps {
	header?: React.ReactNode;
	defaultExpanded?: boolean;
	expanded?: boolean;
	onChange?: (event: any, expanded: boolean) => void;
	sx?: SxProps;
	children?: React.ReactNode;
}

export const GenericAccordion = (props: IGenericAccordionProps): JSX.Element => {
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
