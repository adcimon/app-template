import { UpdatePhoneDto } from '../../api/api';
import { PhoneUtils } from '../../core/utils/phoneUtils';

export type ChangePhoneDfo = Partial<UpdatePhoneDto> & {
	countryCode?: string;
	nationalNumber?: string;
};

export const newChangePhoneDfo = (phone?: string): ChangePhoneDfo => ({
	countryCode: PhoneUtils.getCountryCode(phone ?? ''),
	nationalNumber: PhoneUtils.getNationalNumber(phone ?? ''),
});
