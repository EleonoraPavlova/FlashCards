import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export type FormErrorData = { field: string; message: string }

export type ServerResponseError = {
  errorMessages: FormErrorData[]
}

export type ServerErrorData = {
  message: string
  path: string
  statusCode: number
  timestamp: string
}

export type CustomerError = {
  data: ServerErrorData | ServerResponseError
  status: number
}

export type FetchError = {
  error: string
  status: string
}

export function getErrorMessageData(error: unknown) {
  if (isNetworkError(error)) {
    const errorData = error as FetchError

    return `${errorData.error} or you have no  internet connection`
  }

  if (isFetchBaseQueryError(error)) {
    if ('data' in error) {
      const errorData = error as CustomerError

      if ('errorMessages' in errorData.data) {
        if (Array.isArray(errorData.data.errorMessages)) {
          if (
            errorData.data.errorMessages.length > 0 &&
            typeof errorData.data.errorMessages[0] === 'string'
          ) {
            // Server found error while processing request because of user data in form (400 status) - return joined string
            // example: errorMessages: ["Email already exists"] -> "Email already exists"
            return errorData.data.errorMessages.join(' / ')
          } else if (
            errorData.data.errorMessages.length > 0 &&
            typeof errorData.data.errorMessages[0] === 'object'
          ) {
            // Server found error in user form data, error contains array of { field, message } elements - return array
            // example: errorMessages : [{field: "email", message: "email must be an email"}]
            return errorData.data.errorMessages
          }
        }
      } else if ('message' in errorData.data && errorData.data.statusCode === 401) {
        return `${errorData.data.message}. Please try again`
      } else if ('message' in errorData.data && errorData.data.statusCode === 404) {
        return errorData.data.message
      } else if ('message' in errorData.data && errorData.data.statusCode === 500) {
        return `${errorData.data.message}. Something went wrong`
      }
    }
  } else if (isErrorWithMessage(error)) {
    return error.message
  }

  // any other errors
  return JSON.stringify(error)
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

/**
 * Type predicate to check if the error is a network error (e.g., no internet)
 */
export function isNetworkError(error: unknown): boolean {
  return typeof error === 'object' && error != null && 'status' in error && 'error' in error
}
