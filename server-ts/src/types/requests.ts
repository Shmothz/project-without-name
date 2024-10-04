import {Request} from 'express'

// P Params ({id: string})
// ResBody ({id: number, name: string})[]
// ReqBody ({name: string})
// ReqQuery ({name: string, anotherFilterField: string}) Record<string, string>

export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndReqBody<T, B> = Request<T, { }, B>
export type RequestWithQuery<T> = Request<{}, {}, {} , T>
export type RequestWithReqBody<T> = Request<{}, {}, T>

