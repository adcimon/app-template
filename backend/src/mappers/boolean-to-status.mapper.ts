import { Mapper } from './mapper.js';
import { Status } from '../types/status.js';

class BooleanToStatusMapper extends Mapper<boolean, Status> {
	protected transform(status: boolean): Status {
		const obj: Status = new Status();
		obj.status = status;
		return obj;
	}
}

export const BooleanToStatus = new BooleanToStatusMapper();
