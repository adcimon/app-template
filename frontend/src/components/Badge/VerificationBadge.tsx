import React from 'react';
import Box from '@mui/material/Box';
import VerifiedIcon from '@mui/icons-material/Verified';

interface IVerificationBadgeProps {
	verified: boolean;
}

export const VerificationBadge: React.FC<IVerificationBadgeProps> = (props: IVerificationBadgeProps): JSX.Element => {
	const render = () => {
		return (
			<>
				<Box
					style={{
						alignItems: 'center',
						display: 'inline-flex',
						height: '1.5rem',
						justifyContent: 'center',
						position: 'relative',
						width: '1.5rem',
					}}>
					<Box
						style={{
							backgroundColor: 'white',
							borderRadius: '50%',
							height: '60%',
							position: 'absolute',
							width: '60%',
						}}
					/>
					{props.verified === true && (
						<VerifiedIcon
							sx={{
								fill: 'green',
								marginLeft: '0 !important',
								transform: 'none !important',
								zIndex: '10',
							}}
						/>
					)}
					{props.verified !== true && (
						<VerifiedIcon
							sx={{
								fill: 'gray',
								marginLeft: '0 !important',
								transform: 'none !important',
								zIndex: '10',
							}}
						/>
					)}
				</Box>
			</>
		);
	};

	return render();
};
