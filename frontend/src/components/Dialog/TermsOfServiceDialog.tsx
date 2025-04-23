import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { useAppState } from '../../states/app/useAppState';

interface TermsOfServiceDialogProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const TermsOfServiceDialog = (props: TermsOfServiceDialogProps): React.JSX.Element => {
	const appState = useAppState();

	const render = () => {
		return (
			<Dialog
				open={props.open}
				onClose={props.onClose}
				scroll='paper'>
				<DialogTitle>Terms of Service</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText
						component='div'
						tabIndex={-1}
						sx={{
							textAlign: 'justify',
						}}>
						Effective Date: {appState.metadata?.date}
						<br />
						<br />
						<strong>1. Introduction.</strong>
						<br />
						Welcome to {appState.metadata?.name} ("the Service"). These Terms of Service govern your use of
						the Service. By accessing or using the Service, you agree to be bound by these Terms of Service.
						If you do not agree with these terms, you should not use the Service.
						<br />
						<br />
						<strong>2. Description of Service.</strong>
						<br />
						{appState.metadata?.description}
						<br />
						<br />
						<strong>3. Acceptance of Terms.</strong>
						<br />
						By accessing or using the Service, you acknowledge that you have read, understood, and agree to
						be bound by these Terms of Service. If you are using the Service on behalf of an organization,
						you represent and warrant that you have the authority to enter into these terms on behalf of the
						organization.
						<br />
						<br />
						<strong>4. User Conduct.</strong>
						<br />
						You agree to use the Service only for lawful purposes and in accordance with these Terms of
						Service. You are responsible for any content you submit or post on the Service. You must not:
						<ul>
							<li>Violate any laws or regulations.</li>
							<li>Access or interfere with the Service or its systems without authorization.</li>
							<li>Upload harmful software or engage in disruptive behavior.</li>
							<li>Harass, impersonate, or harm others.</li>
							<li>Post illegal, offensive, or infringing content.</li>
							<li>Spam or use the Service for unauthorized advertising.</li>
							<li>Record, distribute, or misuse live content without permission.</li>
						</ul>
						<br />
						<strong>5. Intellectual Property.</strong>
						<br />
						All content provided by the Service, including software, design, and media, is owned by{' '}
						{appState.metadata?.company?.name} or its licensors and is protected by intellectual property
						laws. You retain ownership of any content you create and share on the platform, but by using the
						Service, you grant us a license to use, display, and distribute that content as needed to
						operate and promote the Service. You confirm that you have the rights to share your content and
						that it doesn't infringe on anyone else's rights.
						<br />
						<br />
						<strong>6. Third-Party Links and Content.</strong>
						<br />
						The Service may contain links to third-party websites or content. We do not endorse or control
						the content on these third-party sites and are not responsible for any actions or omissions of
						third parties. Your use of third-party websites is at your own risk.
						<br />
						<br />
						<strong>7. Disclaimer of Warranties.</strong>
						<br />
						The Service is provided on an "as is" and "as available" basis without any warranties or
						representations of any kind. We do not warrant that the Service will be error-free,
						uninterrupted, or free of viruses or other harmful components.
						<br />
						<br />
						<strong>8. Limitation of Liability.</strong>
						<br />
						In no event shall {appState.metadata?.company?.name} or its affiliates be liable for any direct,
						indirect, incidental, special, or consequential damages arising out of or in any way connected
						with your use of the Service. You agree to indemnify and hold {appState.metadata?.company?.name}{' '}
						harmless from any claims or liabilities arising from your use of the Service.
						<br />
						<br />
						<strong>9. Termination.</strong>
						<br />
						We reserve the right to terminate your access to the Service at any time, with or without cause
						or notice. You may also terminate your use of the Service at any time.
						<br />
						<br />
						<strong>10. Governing Law and Jurisdiction.</strong>
						<br />
						These Terms of Service shall be governed by and construed in accordance with the laws of{' '}
						{appState.metadata?.company?.country}. Any disputes arising out of or in connection with these
						terms shall be resolved exclusively by the courts of {appState.metadata?.company?.country}.
						<br />
						<br />
						<strong>11. Changes to the Terms.</strong>
						<br />
						We may update or modify these Terms of Service from time to time. Any changes will be effective
						immediately upon posting the revised terms on the Service. By continuing to use the Service
						after such changes, you accept and agree to the revised terms.
						<br />
						<br />
						<strong>12. Contact Information.</strong>
						<br />
						If you have any questions or concerns about these Terms of Service, please contact us at{' '}
						<Link>{appState.metadata?.email}</Link>.
						<br />
						<br />
						{appState.metadata?.company?.name}
						<br />
						{appState.metadata?.company?.address}
						<br />
						<Link
							href={appState.metadata?.company?.url}
							target='_blank'>
							{appState.metadata?.company?.url}
						</Link>
					</DialogContentText>
				</DialogContent>
				<DialogActions>{props.onClose && <Button onClick={props.onClose}>Accept</Button>}</DialogActions>
			</Dialog>
		);
	};

	return render();
};
