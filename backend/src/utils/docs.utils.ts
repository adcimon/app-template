import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AuthMethod } from '../types/auth-method.js';

export namespace DocsUtils {
	export const addSecuritySchemes = (builder: DocumentBuilder): void => {
		builder.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			AuthMethod.Bearer,
		);
	};

	export type SchemaCategory = (name: string) => boolean;

	export const sortSchemas = (document: OpenAPIObject, categories?: SchemaCategory[]): void => {
		if (!document.components || !document.components.schemas) {
			return;
		}

		const schemas: Record<string, any> = document.components.schemas;

		const categoryOf = (name: string): number => {
			if (!categories) {
				return 0;
			}

			const index: number = categories.findIndex((matches: SchemaCategory) => matches(name));

			return index === -1 ? categories.length : index;
		};

		const sortedNames: string[] = Object.keys(schemas).sort((a: string, b: string) => {
			const categoryDiff: number = categoryOf(a) - categoryOf(b);
			return categoryDiff !== 0 ? categoryDiff : a.localeCompare(b);
		});

		const sortedSchemas: Record<string, any> = {};
		sortedNames.forEach((key: string) => {
			sortedSchemas[key] = schemas[key];
		});

		document.components.schemas = sortedSchemas;
	};
}
