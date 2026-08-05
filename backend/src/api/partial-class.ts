import { Type } from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';

export function PartialClass<T>(classRef: Type<T>): Type<Partial<T>> {
	const Base = PartialType(classRef) as Type<any>;

	class Derived extends Base {
		constructor() {
			super();
			for (const key of Object.keys(this)) {
				delete (this as any)[key];
			}
		}
	}

	Object.defineProperty(Derived, 'name', { value: `Partial${classRef.name}` });

	return Derived as unknown as Type<Partial<T>>;
}
