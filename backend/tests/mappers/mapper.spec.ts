import { Mapper } from '../../src/mappers/mapper.js';

class NumberToString extends Mapper<number, string> {
	protected transform(value: number): string {
		return `#${value}`;
	}
}

describe('Mapper', () => {
	const mapper = new NumberToString();

	it('should map a single source to a single target', () => {
		expect(mapper.map(1)).toBe('#1');
	});

	it('should map an array of sources to an array of targets', () => {
		expect(mapper.map([1, 2, 3])).toEqual(['#1', '#2', '#3']);
	});

	it('should map an empty array to an empty array', () => {
		expect(mapper.map([])).toEqual([]);
	});
});
