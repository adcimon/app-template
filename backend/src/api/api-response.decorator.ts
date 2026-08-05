import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse as SwaggerApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponse as CustomApiResponse } from '../types/api-response.js';

interface WrappedResponseOptions<TModel extends Type<any>> {
	status: number;
	type?: TModel;
	isArray?: boolean;
}

export const ApiResponse = <TModel extends Type<any>>(options: WrappedResponseOptions<TModel>) => {
	const decorators = [];

	if (!options.type) {
		decorators.push(
			SwaggerApiResponse({
				status: options.status,
				type: CustomApiResponse,
			}),
		);
	} else {
		const item = { $ref: getSchemaPath(options.type) };
		const data = options.isArray ? { type: 'array', items: item } : item;

		decorators.push(ApiExtraModels(CustomApiResponse, options.type));

		decorators.push(
			SwaggerApiResponse({
				status: options.status,
				schema: {
					allOf: [
						{
							$ref: getSchemaPath(CustomApiResponse),
						},
						{
							properties: {
								data,
							},
						},
					],
				},
			}),
		);
	}

	return applyDecorators(...decorators);
};
