import packageJson from '../../package.json' with { type: 'json' };

export namespace AppUtils {
	export const getVersion = (): string => {
		const version: string = packageJson.version;
		return version;
	};
}
