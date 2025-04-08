import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ITermsOfServiceDialogProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const TermsOfServiceDialog = (props: ITermsOfServiceDialogProps): JSX.Element => {
	const render = () => {
		return (
			<Dialog
				open={props.open}
				onClose={props.onClose}
				scroll='paper'>
				<DialogTitle>Terms of Service</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText tabIndex={-1}>
						Effective Date: [Insert Effective Date]
						<br />
						1. Introduction Welcome to [Your Website/App Name] ("the Service"). These Terms of Service
						govern your use of the Service. By accessing or using the Service, you agree to be bound by
						these Terms of Service. If you do not agree with these terms, you should not use the Service.
						<br />
						2. Description of Service [Describe the services or features your website/app offers]
						<br />
						3. Acceptance of Terms By accessing or using the Service, you acknowledge that you have read,
						understood, and agree to be bound by these Terms of Service. If you are using the Service on
						behalf of an organization, you represent and warrant that you have the authority to enter into
						these terms on behalf of the organization.
						<br />
						4. User Conduct You agree to use the Service only for lawful purposes and in accordance with
						these Terms of Service. You are responsible for any content you submit or post on the Service.
						You must not: - [List prohibited activities, such as unauthorized access, spamming, etc.] -
						[Specify any content restrictions, if applicable]
						<br />
						5. Intellectual Property [Specify ownership of content and intellectual property rights] [If
						applicable, explain that users retain ownership of their content but grant the Service a license
						to use it]
						<br />
						6. Third-Party Links and Content The Service may contain links to third-party websites or
						content. We do not endorse or control the content on these third-party sites and are not
						responsible for any actions or omissions of third parties. Your use of third-party websites is
						at your own risk.
						<br />
						7. Disclaimer of Warranties The Service is provided on an "as is" and "as available" basis
						without any warranties or representations of any kind. We do not warrant that the Service will
						be error-free, uninterrupted, or free of viruses or other harmful components.
						<br />
						8. Limitation of Liability In no event shall [Your Company Name] or its affiliates be liable for
						any direct, indirect, incidental, special, or consequential damages arising out of or in any way
						connected with your use of the Service. You agree to indemnify and hold [Your Company Name]
						harmless from any claims or liabilities arising from your use of the Service.
						<br />
						9. Termination We reserve the right to terminate your access to the Service at any time, with or
						without cause or notice. You may also terminate your use of the Service at any time.
						<br />
						10. Governing Law and Jurisdiction These Terms of Service shall be governed by and construed in
						accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or in connection
						with these terms shall be resolved exclusively by the courts of [Your Jurisdiction].
						<br />
						11. Changes to the Terms We may update or modify these Terms of Service from time to time. Any
						changes will be effective immediately upon posting the revised terms on the Service. By
						continuing to use the Service after such changes, you accept and agree to the revised terms.
						<br />
						12. Contact Information If you have any questions or concerns about these Terms of Service,
						please contact us at [Your Contact Email].
						<br />
						[Your Company Name] [Your Address] [Your Website URL]
					</DialogContentText>
				</DialogContent>
				<DialogActions>{props.onClose && <Button onClick={props.onClose}>Accept</Button>}</DialogActions>
			</Dialog>
		);
	};

	return render();
};
