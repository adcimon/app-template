import * as LibPhoneNumber from 'libphonenumber-js';

export namespace PhoneUtils {
	export const getCountryCode = (phone: string): string => {
		try {
			const phoneNumber: LibPhoneNumber.PhoneNumber = LibPhoneNumber.parsePhoneNumberWithError(phone);
			const countryCode: string = phoneNumber.countryCallingCode;
			return countryCode;
		} catch {
			return '';
		}
	};

	export const getNationalNumber = (phone: string): string => {
		try {
			const phoneNumber: LibPhoneNumber.PhoneNumber = LibPhoneNumber.parsePhoneNumberWithError(phone);
			const nationalNumber: string = phoneNumber.nationalNumber;
			return nationalNumber;
		} catch {
			return '';
		}
	};
}
