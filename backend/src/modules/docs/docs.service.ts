import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ApiExtraModels } from '../../api/api-extra-models.js';
import { ApiEnums } from '../../api/api-enums.js';
import { ApiCatalogs } from '../../api/api-catalogs.js';
import { ApiDiscriminators } from '../../api/api-discriminators.js';
import { ApiExtensions } from '../../api/api-extensions.js';
import { AppUtils } from '../../utils/app.utils.js';
import { DocsUtils } from '../../utils/docs.utils.js';

@Injectable()
export class DocsService implements OnModuleInit {
	public static readonly DOCS_PATH = 'docs';
	public static readonly DOCS_JSON_PATH = `${DocsService.DOCS_PATH}/json`;
	public static readonly DOCS_YAML_PATH = `${DocsService.DOCS_PATH}/yaml`;

	private readonly logger: Logger = new Logger(DocsService.name);

	public static init(app: INestApplication): void {
		const document: OpenAPIObject = DocsService.createDocument(app);

		SwaggerModule.setup(DocsService.DOCS_PATH, app, document, {
			jsonDocumentUrl: DocsService.DOCS_JSON_PATH,
			yamlDocumentUrl: DocsService.DOCS_YAML_PATH,
			customCss: '.swagger-ui .topbar-wrapper a { display: none; }',
			customSiteTitle: 'API',
			customfavIcon: 'data:,',
			swaggerOptions: {
				tagsSorter: 'alpha',
			},
		});
	}

	public static createDocument(app: INestApplication): OpenAPIObject {
		const builder: DocumentBuilder = new DocumentBuilder()
			.setTitle('API')
			.setVersion(AppUtils.getVersion())
			.setOpenAPIVersion('3.1.0');
		DocsUtils.addSecuritySchemes(builder);

		const config = builder.build();

		const document: OpenAPIObject = SwaggerModule.createDocument(app, config, {
			extraModels: [...ApiExtraModels.models, ...ApiDiscriminators.models],
			operationIdFactory: (controllerKey: string, methodKey: string) => {
				return `${controllerKey.replace(/Controller$/, '')}/${methodKey}`;
			},
		});

		ApiEnums.apply(document);
		ApiCatalogs.apply(document);
		ApiDiscriminators.apply(document);
		ApiExtensions.apply(document);
		DocsUtils.sortSchemas(document, [(name: string) => !name.endsWith('Dto')]);

		return document;
	}

	public onModuleInit(): void {
		this.logger.log(`Mapped {/${DocsService.DOCS_PATH}, GET} route`);
		this.logger.log(`Mapped {/${DocsService.DOCS_JSON_PATH}, GET} route`);
		this.logger.log(`Mapped {/${DocsService.DOCS_YAML_PATH}, GET} route`);
	}
}
