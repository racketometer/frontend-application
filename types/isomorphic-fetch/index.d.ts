interface IHeaders {
    get(name: string): string;
    getAll(name: string): Array<string>;
    has(name: string): boolean;
}

interface IBody {
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    json<T>(): Promise<T>;
    text(): Promise<string>;
}

interface IRequest extends IBody {
    method: string;
    url: string;
    headers: Headers;
    context: string | RequestContext;
    referrer: string;
    mode: string | RequestMode;
    credentials: string | RequestCredentials;
    cache: string | RequestCache;
}

interface IResponse extends IBody {
    url: string;
    status: number;
    statusText: string;
    ok: boolean;
    headers: IHeaders;
    type: string | ResponseType;
    size: number;
    timeout: number;
    redirect(url: string, status: number): IResponse;
    error(): IResponse;
    clone(): IResponse;
}

interface IFetchStatic {
    Promise: any;
    Headers: IHeaders
    Request: IRequest;
    Response: IResponse;
    (url: string | IRequest, init?: RequestInit): Promise<IResponse>;
}

declare module "isomorphic-fetch" {
    export default IFetchStatic;
}
