export interface IConfigService {
	get(key: string, defaultValue?: any): Promise<any>;
}
