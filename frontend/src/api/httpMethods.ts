export type HttpParams = {
	endpoint?: string;
	data?: any;
	useAuthorization?: boolean;
};

export type HttpGet = (params: HttpParams) => any;
export type HttpPost = (params: HttpParams) => any;
export type HttpPatch = (params: HttpParams) => any;
export type HttpPut = (params: HttpParams) => any;
export type HttpDelete = (params: HttpParams) => any;
