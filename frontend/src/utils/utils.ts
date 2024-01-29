export namespace Utils {
	export const EMAIL_REGEXP: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	export const PHONE_REGEXP: RegExp = /^(^$)|(\+[0-9]*)$/;
	export const AVATAR_REGEXP: RegExp = /^(^$)|(([^]*)(\.)(jpg|jpeg|png))$/;

	export function copyToClipboard(text: string): void {
		navigator.clipboard.writeText(text);
	}

	export function applyPagination(records: any[], page: number, rowsPerPage: number): any[] {
		return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	}

	export function getPlaceholderAvatar(user: any): string {
		return `https://api.dicebear.com/6.x/avataaars/svg?seed=${user?.name || Math.random() * 1000}`;
	}
}
