import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventBrokerService {
	private readonly logger = new Logger(EventBrokerService.name);

	constructor(private readonly eventEmitter: EventEmitter2) {}

	public emit<T>(event: string, payload: T): void {
		this.eventEmitter.emitAsync(event, payload).catch((error: any) => {
			this.logger.error(`Unhandled error in listener for event "${event}"`, error?.stack ?? error);
		});
	}

	public async emitAsync<T>(event: string, payload: T): Promise<void> {
		await this.eventEmitter.emitAsync(event, payload);
	}
}
