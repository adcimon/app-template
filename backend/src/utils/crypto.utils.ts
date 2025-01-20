import * as crypto from 'crypto';
import * as uuid from 'uuid';

export namespace CryptoUtils {
	export const hash = (str: string, algorithm: string = 'sha256'): string => {
		const hash: crypto.Hash = crypto.createHash(algorithm);
		hash.update(str);
		const digest: string = hash.digest('hex');
		return digest;
	};

	export const encodeBase64 = (str: string): string => {
		const base64: string = Buffer.from(str, 'binary').toString('base64');
		return base64;
	};

	export const decodeBase64 = (base64: string): string => {
		const str: string = Buffer.from(base64, 'base64').toString('binary');
		return str;
	};

	export const generateId = (): string => {
		const id: string = uuid.v4();
		return id;
	};
}
