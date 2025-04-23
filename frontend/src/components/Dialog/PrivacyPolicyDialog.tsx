import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { useAppState } from '../../states/app/useAppState';

interface PrivacyPolicyDialogProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const PrivacyPolicyDialog = (props: PrivacyPolicyDialogProps): React.JSX.Element => {
	const appState = useAppState();

	const render = () => {
		return (
			<Dialog
				open={props.open}
				onClose={props.onClose}
				scroll='paper'>
				<DialogTitle>Privacy Policy</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText
						component='div'
						tabIndex={-1}
						sx={{
							textAlign: 'justify',
						}}>
						Thank you for visiting {appState.metadata?.name}. This Privacy Policy explains how we collect,
						use, and protect your personal information when you interact with our website. Please take a
						moment to read this policy carefully.
						<br />
						<br />
						<strong>1. Information.</strong>
						<br />
						We may collect certain personally identifiable information when you visit our website, such as
						your name, email address, and any other information you provide voluntarily. Additionally, we
						may collect non-personal information such as your IP address, browser type, and operating system
						for analytical purposes.
						<br />
						<br />
						<strong>2. Use of Information.</strong>
						<br />
						We use the collected information to provide you with a personalized experience on our website,
						respond to your inquiries, and improve our services. We may also use the information to send you
						promotional emails or newsletters, but you will always have the option to opt-out of such
						communications.
						<br />
						<br />
						<strong>3. Cookies.</strong>
						<br />
						Our website uses cookies to enhance your browsing experience. Cookies are small files stored on
						your device that help us analyze website traffic and improve our website's functionality. By
						using our website, you consent to the use of cookies.
						<br />
						<br />
						<strong>4. Data Security.</strong>
						<br />
						We prioritize the security of your personal information and employ industry-standard security
						measures to protect it against unauthorized access, loss, or alteration. However, please be
						aware that no method of transmission over the internet or electronic storage is 100% secure, and
						we cannot guarantee absolute security.
						<br />
						<br />
						<strong>5. Third-Party Links.</strong>
						<br />
						Our website may contain links to third-party websites or services. Please note that we are not
						responsible for the privacy practices or the content of such third-party websites. We encourage
						you to review the privacy policies of those websites before providing any personal information.
						<br />
						<br />
						<strong>6. Children's Privacy.</strong>
						<br />
						Our website is not intended for children under the age of 13. We do not knowingly collect or
						store personal information from children. If you believe that we have inadvertently collected
						personal information from a child, please contact us immediately, and we will take steps to
						delete the information.
						<br />
						<br />
						<strong>7. Changes to the Privacy Policy.</strong>
						<br />
						We reserve the right to update or modify this Privacy Policy at any time without prior notice.
						Any changes will be effective immediately upon posting the revised policy on our website. Your
						continued use of the website after the changes are made will indicate your acceptance of the
						revised policy.
						<br />
						<br />
						<strong>8. Contact Information.</strong>
						<br />
						If you have any questions or concerns regarding this Privacy Policy or our privacy practices,
						please contact us at <Link>{appState.metadata?.email}</Link>.
						<br />
						<br />
					</DialogContentText>
				</DialogContent>
				<DialogActions>{props.onClose && <Button onClick={props.onClose}>Accept</Button>}</DialogActions>
			</Dialog>
		);
	};

	return render();
};
