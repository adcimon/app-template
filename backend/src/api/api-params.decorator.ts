import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiParam } from '@nestjs/swagger';
import { getMetadataStorage } from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata.js';

export const ApiParams = (dto: Type<object>) => {
	const metadatas: ValidationMetadata[] = getMetadataStorage().getTargetValidationMetadatas(dto, '', false, false);
	const names: string[] = [...new Set(metadatas.map((metadata: ValidationMetadata) => metadata.propertyName))];

	return applyDecorators(
		ApiExtraModels(dto),
		...names.map((name: string) =>
			ApiParam({
				name,
				required: true,
				schema: { $ref: `#/components/schemas/${dto.name}/properties/${name}` } as any,
			}),
		),
	);
};
