import { OpenAPIObject } from '@nestjs/swagger';

export namespace ApiCatalogs {
	export interface Catalog {
		ref: string;
		values: unknown[];
	}

	export const schemas: Map<string, Catalog> = new Map<string, Catalog>();

	export function register(name: string, ref: string, values: unknown[]): void {
		schemas.set(name, { ref, values });
	}

	export function apply(document: OpenAPIObject): void {
		if (!document.components?.schemas) {
			return;
		}

		const schemas: Record<string, any> = document.components.schemas;

		for (const [name, catalog] of ApiCatalogs.schemas) {
			schemas[name] = {
				type: 'array',
				items: { $ref: `#/components/schemas/${catalog.ref}` },
				const: catalog.values,
			};
		}
	}
}
