import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventBrokerService {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	public emit<T>(event: string, payload: T): void {
		this.eventEmitter.emit(event, payload);
	}

	public async emitAsync<T>(event: string, payload: T): Promise<void> {
		await this.eventEmitter.emitAsync(event, payload);
	}
}
