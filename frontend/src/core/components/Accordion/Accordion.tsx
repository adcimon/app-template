import React from 'react';
import * as MUI from '@mui/material';
import { AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type AccordionProps = MUI.AccordionProps & {
	header?: React.ReactNode;
};

export const Accordion = ({ header, ...props }: AccordionProps): React.JSX.Element => {
	const render = () => {
		return (
			<MUI.Accordion {...props}>
				<AccordionSummary expandIcon={<ArrowDropDownIcon />}>{header}</AccordionSummary>
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
