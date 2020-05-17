import status from 'http-status';

const defaultHeaders = {
  'Content-Type': 'application/json'
}
interface ValidationError extends Error {
  type?: string;
}

export function successResponse(content = {}) {
  return {
    headers: defaultHeaders,
    status: status.OK,
    body: { content },
  }
}

export function createdResponse(content = {}) {
  return {
    headers: defaultHeaders,
    status: status.CREATED,
    body: { content },
  }
}

export function deletedResponse(content = {}) {
  return {
    headers: defaultHeaders,
    status: status.NO_CONTENT,
    body: { content },
  }
}

export function internalErrorResponse(error: Error | string = 'Something went wrong') {
  return {
    headers: defaultHeaders,
    status: status.INTERNAL_SERVER_ERROR,
    body: { message: typeof error === 'object' ? error.message : error },
  }
}

export function invalidRequest(error: Error) {
  return {
    headers: defaultHeaders,
    status: status.BAD_REQUEST,
    body: {
      message: status['400_MESSAGE'],
      details: typeof error === 'object' ? error.message : error,
    },
  }
}

export function getErrorResponse(error: ValidationError | string) {
  if (typeof error === 'object' && error.type === 'any.required') {
    return invalidRequest(error);
  }
  return internalErrorResponse(error);
}
