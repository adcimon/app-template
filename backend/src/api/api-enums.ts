import { OpenAPIObject } from '@nestjs/swagger';

export namespace ApiEnums {
	export interface Entry {
		title: string;
		const: string | number;
	}

	export const schemas: Map<string, Entry[]> = new Map<string, Entry[]>();

	export function register(name: string, enumType: object): void {
		const entries: Entry[] = Object.entries(enumType)
			.filter(([key, value]: [string, any]) => {
				return isNaN(Number(key)) && (typeof value === 'number' || typeof value === 'string');
			})
			.map(([key, value]: [string, any]) => {
				return {
					title: key,
					const: value,
				};
			});

		schemas.set(name, entries);
	}

	export function apply(document: OpenAPIObject): void {
		if (!document.components?.schemas) {
			return;
		}

		const documentSchemas: Record<string, any> = document.components.schemas;
		const names: Set<string> = new Set<string>(schemas.keys());
		const index: { signature: string; name: string }[] = [];

		const signature = (values: (string | number)[]): string => JSON.stringify([...values].sort());

		// Define the shared enum schemas.
		for (const [name, entries] of schemas) {
			documentSchemas[name] = {
				type: typeof entries[0].const === 'number' ? 'integer' : 'string',
				oneOf: entries.map((e: Entry) => ({
					title: e.title,
					const: e.const,
				})),
			};
			index.push({ signature: signature(entries.map((e: Entry) => e.const)), name });
		}

		// Replace any inline enum whose value set matches a shared enum with a $ref.
		for (const schemaName of Object.keys(documentSchemas)) {
			if (names.has(schemaName)) {
				continue;
			}

			const properties: Record<string, any> | undefined = documentSchemas[schemaName]?.properties;
			if (!properties) {
				continue;
			}

			for (const propertyName of Object.keys(properties)) {
				const property: Record<string, any> = properties[propertyName];

				if (property?.type === 'array' && Array.isArray(property.items?.enum)) {
					const match = index.find((entry) => entry.signature === signature(property.items.enum));
					if (match) {
						property.items = { $ref: `#/components/schemas/${match.name}` };
					}
				} else if (Array.isArray(property?.enum)) {
					const match = index.find((entry) => entry.signature === signature(property.enum));
					if (match) {
						properties[propertyName] = { $ref: `#/components/schemas/${match.name}` };
					}
				}
			}
		}
	}
}
