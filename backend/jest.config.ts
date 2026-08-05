import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.json',
				diagnostics: {
					ignoreCodes: [2345, 2823, 151002],
				},
			},
		],
	},
};

export default config;
