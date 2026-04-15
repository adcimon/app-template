import 'reflect-metadata';
import { EVENT_HANDLER_METADATA } from './event-broker.constants.js';

export function EventHandler(event: string): MethodDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata(EVENT_HANDLER_METADATA, event, target, propertyKey as string);
	};
}
