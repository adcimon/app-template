export namespace AppUtils {
	export const EMAIL_REGEXP: RegExp = /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
	export const PHONE_REGEXP: RegExp = /^\+\d{1,4}\d{6,14}$/;
	export const AVATAR_REGEXP: RegExp = /^[\p{L}\p{N}_\-\s]+\.(jpg|jpeg|png)$/iu;

	export const getAvatar = (user: any): string | undefined => {
		if (!user) {
			return undefined;
		}

		if (!user.avatar || user.avatar === '') {
			return `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.name || Math.random() * 1000}`;
		}

		return user.avatar;
	};
}
