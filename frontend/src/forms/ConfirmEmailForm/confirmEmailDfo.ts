export type ConfirmEmailDfo = {
	confirmEmail?: string;
};

export const newConfirmEmailDfo = (): ConfirmEmailDfo => ({
	confirmEmail: '',
});
