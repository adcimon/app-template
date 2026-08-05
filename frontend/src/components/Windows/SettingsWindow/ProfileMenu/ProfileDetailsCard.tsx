import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { ToastManager } from '../../../../managers/ToastManager/ToastManager';
import { UserForm } from '../../../../forms/UserForm/UserForm';
import { useUserState } from '../../../../states/user/useUserState';
import { useUserForm } from '../../../../forms/UserForm/useUserForm';

export const ProfileDetailsCard = (): React.JSX.Element => {
	const userState = useUserState();

	const { form, validate, handleChange } = useUserForm(userState.user);

	const handleSave = async () => {
		try {
			await userState.update(form);
			ToastManager.success('Profile updated');
		} catch (error: any) {
			ToastManager.error(error.message);
		}
	};

	const render = () => {
		return (
			<Card>
				<CardHeader
					subheader={
						<Typography
							sx={{
								fontWeight: 'bold',
							}}>
							Details
						</Typography>
					}
				/>
				<CardContent
					sx={{
						paddingTop: 0,
					}}>
					<UserForm
						user={userState.user}
						form={form}
						onChange={handleChange}
					/>
				</CardContent>
				<Divider />
				<CardActions
					sx={{
						justifyContent: 'flex-end',
					}}>
					<Button
						disabled={!validate()}
						variant='contained'
						onClick={handleSave}>
						Save
					</Button>
				</CardActions>
			</Card>
		);
	};

	return render();
};
