export type ApiOptions = {
  path: string
  params?: Record<string, string> | URLSearchParams
} & RequestInit

export type AppError = {
  type: 'UnknownError' | 'ServerError'
  message: string
  rootCause?: unknown
}

const RE_CONTENT_TYPE_JSON = new RegExp('^application/(x-)?json', 'i')
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred while processing your request.'
const BASE_URL = 'https://api.flashcards.andrii.es'
export const makeRequest = async <T>(options: ApiOptions): Promise<T> => {
  const config: RequestInit = {
    cache: 'default',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // if (options.params !== null && !(options.params instanceof URLSearchParams) ) {
  //
  // }

  if (options.body instanceof FormData) {
    config.headers = undefined
  }

  const request = new Request(BASE_URL + options.path, { ...config, ...options })
  const cloneRequest = request.clone()
  console.log(request)
  try {
    const requestResponse = await fetch(request)
    const responseData = await unwrapResponseBody(requestResponse)

    if (!requestResponse.ok) {
      if (requestResponse.status === 401 && !requestResponse.url.includes('login')) {
        const refreshResponse = await fetch(BASE_URL + '/v1/auth/refresh-token', {
          credentials: 'include',
          method: 'POST'
        })

        const refreshData = await unwrapResponseBody(refreshResponse)

        console.log('refresh data', refreshData)
        if (refreshResponse.ok) {
          console.log('refresh response ok')
          const requestResponse = await fetch(cloneRequest)

          console.log('request response', requestResponse)
          return await unwrapResponseBody(requestResponse)
        } else {
          return Promise.reject(normalizeError(refreshData))
        }
      }

      return Promise.reject(normalizeError(responseData))
    }

    return responseData
  } catch (error) {
    return Promise.reject(normalizeUnknownError(error))
  }
}

export const makeAuthorizedRequest = <T>(options: ApiOptions) => {
  const config: ApiOptions = {
    ...options,
    credentials: 'include'
  }
  return makeRequest<T>(config)
}

const normalizeUnknownError = (error: unknown): AppError => {
  return {
    type: 'UnknownError',
    message: UNEXPECTED_ERROR_MESSAGE,
    rootCause: error
  }
}

const normalizeError = (errorData: unknown): AppError => {
  const error: AppError = {
    type: 'ServerError' as const,
    message: UNEXPECTED_ERROR_MESSAGE
  }

  if (typeof errorData === 'object' && errorData) {
    if ('message' in errorData && typeof errorData.message === 'string') {
      return Object.assign(error, errorData)
    }
  }

  error.rootCause = errorData
  return error
}

const unwrapResponseBody = async (response: Response) => {
  const contentType = response.headers.has('Content-Type')
    ? response.headers.get('Content-Type')
    : ''

  if (contentType !== null && RE_CONTENT_TYPE_JSON.test(contentType)) {
    return response.json()
  }

  return response.text()
}
