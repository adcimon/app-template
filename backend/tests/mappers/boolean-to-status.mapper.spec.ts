import { BooleanToStatus } from '../../src/mappers/boolean-to-status.mapper.js';
import { Status } from '../../src/types/status.js';

describe('BooleanToStatus', () => {
	it('should return Status with status true', () => {
		const status: Status = BooleanToStatus.map(true);
		expect(status).toBeInstanceOf(Status);
		expect(status.status).toBe(true);
	});

	it('should return Status with status false', () => {
		const status: Status = BooleanToStatus.map(false);
		expect(status).toBeInstanceOf(Status);
		expect(status.status).toBe(false);
	});
});
