import { OpenAPIObject } from '@nestjs/swagger';

export namespace ApiExtensions {
	export interface Extension {
		properties: Record<string, any>;
		required?: string[];
	}

	export const schemas: Map<string, Extension> = new Map<string, Extension>();

	export function register(name: string, extension: Extension): void {
		schemas.set(name, extension);
	}

	export function apply(document: OpenAPIObject): void {
		if (!document.components?.schemas) {
			return;
		}

		const documentSchemas: Record<string, any> = document.components.schemas;

		for (const [name, extension] of schemas) {
			const schema: Record<string, any> | undefined = documentSchemas[name];
			if (!schema) {
				continue;
			}

			schema.properties = {
				...(schema.properties ?? {}),
				...extension.properties,
			};

			if (extension.required?.length) {
				schema.required = [...new Set<string>([...(schema.required ?? []), ...extension.required])];
			}
		}
	}
}
