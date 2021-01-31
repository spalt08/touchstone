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
  code?: string
  language?: string
  options?: Record<string, string>
  title?: string
  type?: string
}

/**
 * CreateRequest represents request data for POST /benchmark
 */
export interface CreateRequest {
  /** Array of code parts */
  code_parts?: CodePart[]

  /** A platform to run the benchmark */
  platform?: string

  /** The benchmark setup code */
  setup_code?: Record<string, string>

  /** The benchmark title */
  title?: string
}

/**
 * ErrorAPIResponse is a wrapper for all API error responses
 */
export interface ErrorAPIResponse {
  /** Request error */
  error?: GenericAPIError

  /** Request result */
  result?: object

  /** Response notation version */
  version?: number
}

/**
 * GenericAPIError is a wrapper for all API errors
 */
export interface GenericAPIError {
  /** Error code, often same as HTTP status code */
  code?: number

  /** Error details */
  data?: object

  /** Humanized message */
  message?: string
}

/**
 * GenericAPIResponse is a wrapper for all API responses
 */
export interface GenericAPIResponse {
  /** Request error */
  error?: object

  /** Request result */
  result?: object

  /** Response notation version */
  version?: number
}

/**
* GithubLoginRequest represents request data for POST /login
Ref: https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
*/
export interface GithubLoginRequest {
  /** The Github oAuth code received as oAuth response */
  code?: string

  /** The unguessable random string provided in the initial oAuth request */
  state?: string
}

/**
 * GithubLoginResponse represents response for POST /login
 */
export interface GithubLoginResponse {
  token: string
  user: User
}

export interface User {
  /** Link to avatar picture */
  avatar_url?: string

  /** User identifier, same as Github ID */
  id?: number

  /** User full name */
  name?: string

  /** Unique username, same as Github login */
  username?: string
}

export type RequestParams = Omit<RequestInit, 'body' | 'method'> & {
  secure?: boolean
}

export type RequestQueryParamsType = Record<string | number, any>

interface ApiConfig<SecurityDataType> {
  baseUrl?: string
  baseApiParams?: RequestParams
  securityWorker?: (securityData: SecurityDataType) => RequestParams
}

enum BodyType {
  Json,
  FormData,
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://api.touch.st/v1'
  private securityData: SecurityDataType = null as any
  private securityWorker: null | ApiConfig<SecurityDataType>['securityWorker'] = null

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }

  public hasSecurityData = () => !!this.securityData

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + '=' + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(',') : query[key])
    )
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === 'object' && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key)
          )
          .join('&')}`
      : ''
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key])
        return data
      }, new FormData()),
  }

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
    }
  }

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean
  ): Promise<T> => {
    const requestUrl = `${this.baseUrl}${path}`
    const secureOptions =
      (secureByDefault || secure) && this.securityWorker ? this.securityWorker(this.securityData) : {}
    const requestOptions = {
      ...this.mergeRequestOptions(params, secureOptions),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }

    return fetch(requestUrl, requestOptions).then(async (response) => {
      const data = await response.json().catch(() => undefined)

      if (!data) throw new Error('Unable to parse API response')
      if (response.status !== 200 || data.error) throw data.error as E

      return data.result as T
    })
  }
}
/**
 * @title Touchstone API
 * @version 0.1.0
 * @baseUrl https://api.touch.st/v1
 * Backend REST application for the Touchstone clients
 */
export class API<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  benchmark = {
    /**
     * No description
     *
     * @tags Benchmark
     * @name Create
     * @summary Benchmark creation
     * @request POST:/benchmark
     */
    create: (Request: CreateRequest, params?: RequestParams) =>
      this.request<CreateRequest, any>(`/benchmark`, 'POST', params, Request),
  }
  user = {
    /**
     * @description Can be used both for signing in and registration
     *
     * @tags User
     * @name Login
     * @summary Authentification
     * @request POST:/user/login
     */
    login: (Request: GithubLoginRequest, params?: RequestParams) =>
      this.request<GithubLoginResponse, any>(`/user/login`, 'POST', params, Request),

    /**
     * @description Returns current authorized user
     *
     * @tags User
     * @name Me
     * @summary Get Account
     * @request GET:/user/me
     * @secure
     */
    me: (params?: RequestParams) => this.request<User, any>(`/user/me`, 'GET', params, null, BodyType.Json, true),
  }
}
