export type HttpGet = (endpoint: string, useAuthorization: boolean) => any;
export type HttpPost = (endpoint: string, data: object, useAuthorization: boolean) => any;
export type HttpPatch = (endpoint: string, data: object, useAuthorization: boolean) => any;
export type HttpPut = (endpoint: string, data: object, useAuthorization: boolean) => any;
export type HttpDelete = (endpoint: string, data: object, useAuthorization: boolean) => any;
