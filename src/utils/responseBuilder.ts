import status from 'http-status';

const defaultHeaders = {
  'Content-Type': 'application/json'
}

export function successResponse(content = {}) {
  return {
    headers: defaultHeaders,
    status: status.OK,
    body: { content },
  }
}

export function errorResponse(error: { message: string } | string = 'Something went wrong') {
  return {
    headers: defaultHeaders,
    status: status.INTERNAL_SERVER_ERROR,
    body: { message: typeof error === 'object' ? error.message : error },
  }
}
