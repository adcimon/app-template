import { OpenAPIObject } from '@nestjs/swagger';

export namespace ApiDiscriminators {
	export interface Discriminator {
		base: Function;
		property: string;
		variants: Variant[];
	}

	export interface Variant {
		value: string | number;
		model: Function;
	}

	export const discriminators: Discriminator[] = [];
	export const models: Function[] = [];

	export function register(base: Function, property: string, variants: Variant[]): void {
		discriminators.push({ base, property, variants });
		models.push(base, ...variants.map((variant: Variant) => variant.model));
	}

	export function apply(document: OpenAPIObject): void {
		if (!document.components?.schemas) {
			return;
		}

		const schemas: Record<string, any> = document.components.schemas;

		for (const discriminator of discriminators) {
			const baseName: string = discriminator.base.name;
			const baseSchema: Record<string, any> | undefined = schemas[baseName];
			if (!baseSchema) {
				continue;
			}

			const baseProperties: string[] = Object.keys(baseSchema.properties ?? {});
			const mapping: Record<string, string> = {};

			for (const variant of discriminator.variants) {
				const name: string = variant.model.name;
				const flat: Record<string, any> | undefined = schemas[name];
				if (!flat) {
					continue;
				}

				const ownProperties: Record<string, any> = {};
				const ownRequired: string[] = [];

				for (const [key, value] of Object.entries<any>(flat.properties ?? {})) {
					if (baseProperties.includes(key) && key !== discriminator.property) {
						continue;
					}
					ownProperties[key] = value;
					if ((flat.required ?? []).includes(key)) {
						ownRequired.push(key);
					}
				}

				ownProperties[discriminator.property] = {
					type: typeof variant.value === 'number' ? 'integer' : 'string',
					const: variant.value,
				};
				if (!ownRequired.includes(discriminator.property)) {
					ownRequired.push(discriminator.property);
				}

				schemas[name] = {
					allOf: [
						{ $ref: `#/components/schemas/${baseName}` },
						{
							type: 'object',
							properties: ownProperties,
							...(ownRequired.length ? { required: ownRequired } : {}),
						},
					],
				};

				mapping[String(variant.value)] = `#/components/schemas/${name}`;
			}

			baseSchema.discriminator = { propertyName: discriminator.property, mapping };
			baseSchema.required = [...new Set<string>([...(baseSchema.required ?? []), discriminator.property])];
		}
	}
}
