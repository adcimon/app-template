import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GenericCard } from '../../../../core/components/Card/GenericCard';
import { PrivacyPolicyDialog } from '../../../../core/components/Dialog/PrivacyPolicyDialog';
import { TermsOfServiceDialog } from '../../../../core/components/Dialog/TermsOfServiceDialog';
import { Window } from '../../../../core/components/Window/Window';

interface IHelpWindowProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const HelpWindow: React.FC<IHelpWindowProps> = (props: IHelpWindowProps): JSX.Element => {
	const [openTermsOfServiceDialog, setOpenTermsOfServiceDialog] = React.useState<boolean>(false);
	const [openPrivacyPolicyDialog, setOpenPrivacyPolicyDialog] = React.useState<boolean>(false);

	const handleOpenTermsOfService = () => {
		setOpenTermsOfServiceDialog(true);
	};

	const handleCloseTermsOfService = () => {
		setOpenTermsOfServiceDialog(false);
	};

	const handleOpenPrivacyPolicy = () => {
		setOpenPrivacyPolicyDialog(true);
	};

	const handleClosePrivacyPolicy = () => {
		setOpenPrivacyPolicyDialog(false);
	};

	const handleClose = (event: any) => {
		if (props.onClose) {
			props.onClose(event);
		}
	};

	const render = () => {
		return (
			<>
				<Window
					label='Help'
					open={props.open}
					onClose={handleClose}>
					<Grid
						container
						spacing={3}
						sx={{
							justifyContent: 'center',
							width: '100%',
							'& > *': {
								padding: '10px !important',
							},
						}}>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}>
							<GenericCard
								image='/images/learn.jpg'
								title='Help'
								actions={
									<Button
										size='small'
										href=''
										target='_blank'>
										Start Learning
									</Button>
								}>
								<Typography color='text.secondary'>
									New to the app? Get started with our helpful guides and tutorials. Learn how to make
									the most of our features.
								</Typography>
							</GenericCard>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}>
							<GenericCard
								image='/images/contact.jpg'
								title='Contact Us'
								actions={
									<Button
										size='small'
										href=''
										target='_blank'>
										Contact
									</Button>
								}>
								<Typography color='text.secondary'>
									Have a question, suggestion, or feedback? We'd love to hear from you! Reach out to
									our support team via email or chat.
								</Typography>
							</GenericCard>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							lg={4}>
							<GenericCard
								image='/images/legal.jpg'
								title='Legal'
								actions={
									<>
										<Button
											size='small'
											onClick={handleOpenTermsOfService}>
											Terms of Service
										</Button>
										<Button
											size='small'
											onClick={handleOpenPrivacyPolicy}>
											Privacy Policy
										</Button>
									</>
								}>
								<Typography color='text.secondary'>
									Read our Terms of Service and Privacy Policy to understand the rules and guidelines
									for using our application and how we collect, use, and protect your data.
								</Typography>
							</GenericCard>
						</Grid>
					</Grid>
					<TermsOfServiceDialog
						open={openTermsOfServiceDialog}
						onClose={handleCloseTermsOfService}
					/>
					<PrivacyPolicyDialog
						open={openPrivacyPolicyDialog}
						onClose={handleClosePrivacyPolicy}
					/>
				</Window>
			</>
		);
	};

	return render();
};
