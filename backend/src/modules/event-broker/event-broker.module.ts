import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper.js';
import { EventEmitterModule, EventEmitter2 } from '@nestjs/event-emitter';
import { EventBrokerService } from './event-broker.service.js';
import { EVENT_HANDLER_METADATA } from './event-broker.constants.js';

@Module({
	imports: [DiscoveryModule, EventEmitterModule.forRoot()],
	providers: [EventBrokerService, MetadataScanner],
	exports: [EventBrokerService],
})
export class EventBrokerModule implements OnModuleInit {
	constructor(
		private readonly discoveryService: DiscoveryService,
		private readonly metadataScanner: MetadataScanner,
		private readonly eventEmitter: EventEmitter2,
	) {}

	onModuleInit() {
		const providers: InstanceWrapper<any>[] = this.discoveryService.getProviders();
		for (const wrapper of providers) {
			const instance: any = wrapper.instance;
			if (!instance) {
				continue;
			}

			const prototype: any = Object.getPrototypeOf(instance);
			if (!prototype) {
				continue;
			}

			const methodNames: string[] = this.metadataScanner.getAllMethodNames(prototype);
			for (const methodName of methodNames) {
				const methodRef: any = instance[methodName];
				if (typeof methodRef !== 'function') {
					continue;
				}

				const event: any = Reflect.getMetadata(EVENT_HANDLER_METADATA, prototype, methodName);
				if (!event) {
					continue;
				}

				this.eventEmitter.on(event, methodRef.bind(instance));
			}
		}
	}
}
