type ServiceResponseErrorStatus = 'NOT_FOUND' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'ERROR'

type ServiceResponseError = {status:ServiceResponseErrorStatus, data: {message:string}}

type ServiceResponseSuccess<T> = { status: 'SUCCESSFUL' | 'CREATED', data: T }

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>