import status from 'http-status';

const defaultHeaders = {
  'Content-Type': 'application/json'
}

interface ValidationErrorInterface extends Error {
  type?: string;
}

export class ValidationError {
  constructor(
    private message: string,
    private type: errorTypes
  ) {}
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

export function forbiddenErrorResponse(error: Error | string = 'Something went wrong') {
  return {
    headers: defaultHeaders,
    status: status.FORBIDDEN,
    body: { message: typeof error === 'object' ? error.message : error },
  }
}

export function notFoundErrorResponse(error: Error | string = 'Something went wrong') {
  return {
    headers: defaultHeaders,
    status: status.NOT_FOUND,
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

export function getErrorResponse(error: ValidationErrorInterface | string) {
  if (typeof error === 'object') {
    switch (error.type) {
      case 'any.required':
        return invalidRequest(error);
      case '403':
        return forbiddenErrorResponse(error);
      case '404':
        return notFoundErrorResponse(error);
      default:
        return internalErrorResponse(error);
    }
  }
  return internalErrorResponse(error);
}
