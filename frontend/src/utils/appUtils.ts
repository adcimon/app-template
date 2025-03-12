export namespace AppUtils {
	export const EMAIL_REGEXP: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	export const PHONE_REGEXP: RegExp = /^\+[0-9]*$/;
	export const AVATAR_REGEXP: RegExp = /^([^]*)(\.)(jpg|jpeg|png)$/;

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
