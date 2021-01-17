/* tslint:disable */
/* eslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * CodePart represents basic bulding block of a benchmark
 */
export interface CodePart {
  code?: string;
  language?: string;
  options?: Record<string, string>;
  title?: string;
  type?: string;
}

/**
 * CreateRequest represents request data for POST /benchmark
 */
export interface CreateRequest {
  /** Array of code parts */
  code_parts?: CodePart[];

  /** A platform to run the benchmark */
  platform?: string;

  /** The benchmark setup code */
  setup_code?: Record<string, string>;

  /** The benchmark title */
  title?: string;
}

/**
 * ErrorAPIResponse is a wrapper for all API error responses
 */
export interface ErrorAPIResponse {
  /** Request error */
  error?: GenericAPIError;

  /** Request result */
  result?: object;

  /** Response notation version */
  version?: number;
}

/**
 * GenericAPIError is a wrapper for all API errors
 */
export interface GenericAPIError {
  /** Error code, often same as HTTP status code */
  code?: number;

  /** Error details */
  data?: object;

  /** Humanized message */
  message?: string;
}

/**
 * GenericAPIResponse is a wrapper for all API responses
 */
export interface GenericAPIResponse {
  /** Request error */
  error?: object;

  /** Request result */
  result?: object;

  /** Response notation version */
  version?: number;
}

/**
* GithubLoginRequest represents request data for POST /login
Ref: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
*/
export interface GithubLoginRequest {
  /** The Github oAuth code received as oAuth response */
  code?: string;

  /** The unguessable random string provided in the initial oAuth request */
  state?: string;
}

/**
 * GithubLoginResponse represents response for POST /login
 */
export interface GithubLoginResponse {
  token?: string;
  user?: User;
}

export interface User {
  /** Link to avatar picture */
  avatar_url?: string;

  /** User identifier, same as Github ID */
  id?: number;

  /** User full name */
  name?: string;

  /** Unique username, same as Github login */
  username?: string;
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

interface ApiConfig<SecurityDataType> {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
}

interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

enum BodyType {
  Json,
  FormData,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://api.touch.st/v1";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
  };

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<HttpResponse<T, E>> => {
    const r = response as HttpResponse<T, E>;
    r.data = (null as unknown) as T;
    r.error = (null as unknown) as E;

    return response
      .json()
      .then((data) => {
        if (r.ok) {
          r.data = data;
        } else {
          r.error = data;
        }
        return r;
      })
      .catch((e) => {
        r.error = e;
        return r;
      });
  };

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<HttpResponse<T>> => {
    const requestUrl = `${this.baseUrl}${path}`;
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {};
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    };

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Touchstone API
 * @version 0.0.1
 * @baseUrl http://api.touch.st/v1
 * Backend REST application for the Touchstone clients
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  benchmark = {
    /**
     * No description
     *
     * @tags Benchmark
     * @name CreateBenchmark
     * @summary Benchmark creation
     * @request POST:/benchmark
     */
    createBenchmark: (Request: CreateRequest, params?: RequestParams) =>
      this.request<CreateRequest, any>(`/benchmark`, "POST", params, Request),
  };
  login = {
    /**
     * @description Can be used both for signing in and registration
     *
     * @tags User
     * @name UserLogin
     * @summary Authentification
     * @request POST:/login/github
     */
    userLogin: (Request: GithubLoginRequest, params?: RequestParams) =>
      this.request<GithubLoginResponse, any>(`/login/github`, "POST", params, Request),
  };
  me = {
    /**
     * @description Returns current authorized user
     *
     * @tags User
     * @name UserSelf
     * @summary Get Account
     * @request GET:/me
     * @secure
     */
    userSelf: (params?: RequestParams) => this.request<User, any>(`/me`, "GET", params, null, BodyType.Json, true),
  };
}
