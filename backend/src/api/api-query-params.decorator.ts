import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiQuery } from '@nestjs/swagger';
import { getMetadataStorage } from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata.js';

export const ApiQueryParams = (dto: Type<object>) => {
	const metadatas: ValidationMetadata[] = getMetadataStorage().getTargetValidationMetadatas(dto, '', false, false);
	const names: string[] = [...new Set(metadatas.map((metadata: ValidationMetadata) => metadata.propertyName))];

	return applyDecorators(
		ApiExtraModels(dto),
		...names.map((name: string) => {
			const isOptional: boolean = metadatas.some(
				(metadata: ValidationMetadata) =>
					metadata.propertyName === name && metadata.type === 'conditionalValidation',
			);

			return ApiQuery({
				name,
				required: !isOptional,
				schema: { $ref: `#/components/schemas/${dto.name}/properties/${name}` } as any,
			});
		}),
	);
};
