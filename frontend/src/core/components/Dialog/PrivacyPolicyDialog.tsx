import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IPrivacyPolicyDialogProps {
	open: boolean;
	onClose?: (event: any) => void;
}

export const PrivacyPolicyDialog = (props: IPrivacyPolicyDialogProps): JSX.Element => {
	const render = () => {
		return (
			<Dialog
				open={props.open}
				onClose={props.onClose}
				scroll='paper'>
				<DialogTitle>Privacy Policy</DialogTitle>
				<DialogContent dividers={true}>
					<DialogContentText tabIndex={-1}>
						Thank you for visiting our website. This Privacy Policy explains how we collect, use, and
						protect your personal information when you interact with our website. Please take a moment to
						read this policy carefully.
						<br />
						1. Information We Collect We may collect certain personally identifiable information when you
						visit our website, such as your name, email address, and any other information you provide
						voluntarily. Additionally, we may collect non-personal information such as your IP address,
						browser type, and operating system for analytical purposes.
						<br />
						2. Use of Information We use the collected information to provide you with a personalized
						experience on our website, respond to your inquiries, and improve our services. We may also use
						the information to send you promotional emails or newsletters, but you will always have the
						option to opt-out of such communications.
						<br />
						3. Cookies Our website uses cookies to enhance your browsing experience. Cookies are small files
						stored on your device that help us analyze website traffic and improve our website's
						functionality. By using our website, you consent to the use of cookies.
						<br />
						4. Data Security We prioritize the security of your personal information and employ
						industry-standard security measures to protect it against unauthorized access, loss, or
						alteration. However, please be aware that no method of transmission over the internet or
						electronic storage is 100% secure, and we cannot guarantee absolute security.
						<br />
						5. Third-Party Links Our website may contain links to third-party websites or services. Please
						note that we are not responsible for the privacy practices or the content of such third-party
						websites. We encourage you to review the privacy policies of those websites before providing any
						personal information.
						<br />
						6. Children's Privacy Our website is not intended for children under the age of 13. We do not
						knowingly collect or store personal information from children. If you believe that we have
						inadvertently collected personal information from a child, please contact us immediately, and we
						will take steps to delete the information.
						<br />
						7. Changes to the Privacy Policy We reserve the right to update or modify this Privacy Policy at
						any time without prior notice. Any changes will be effective immediately upon posting the
						revised policy on our website. Your continued use of the website after the changes are made will
						indicate your acceptance of the revised policy.
						<br />
						8. Contact Us If you have any questions or concerns regarding this Privacy Policy or our privacy
						practices, please contact us at [your contact information].
						<br />
						Please note that this is a temporary placeholder privacy policy. We recommend consulting with a
						legal professional to tailor a privacy policy that aligns with your specific website and
						applicable laws and regulations.
						<br />
					</DialogContentText>
				</DialogContent>
				<DialogActions>{props.onClose && <Button onClick={props.onClose}>Accept</Button>}</DialogActions>
			</Dialog>
		);
	};

	return render();
};
