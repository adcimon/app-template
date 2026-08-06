export class SignUpDwo {
	email: string;
	password: string;
}

export class SignDownDwo {
	password: string;
}

export class SignInDwo {
	email: string;
	password: string;
}

export class RefreshTokenDwo {
	refreshToken: string;
}

export class VerifyEmailDwo {
	code: string;
}

export class ForgotPasswordDwo {
	email: string;
}

export class ConfirmPasswordDwo {
	email: string;
	code: string;
	password: string;
}

export class ChangePasswordDwo {
	currentPassword: string;
	newPassword: string;
}
