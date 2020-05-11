import status from 'http-status';

const defaultHeaders = {
  'Content-Type': 'application/json'
}
const baseErrorResConfig = {
  statusCode: status.INTERNAL_SERVER_ERROR,
  headers: {}
}

class ResponseSender {
  static sendSuccess(
    res: any,
    content = {},
    config = { statusCode: status.OK, headers: {} }
  ) {
      res
      .set({
        ...defaultHeaders,
        ...config.headers,
      })
      .status(config.statusCode)
      .send({ content })
  }
  static sendError(
    res: any,
    error: { message: string } | string = 'Something went wrong',
    config = {}
  ) {
    const resConfig = {...baseErrorResConfig, ...config};
    res
      .set({
        ...defaultHeaders,
        ...resConfig.headers,
      })
      .status(resConfig.statusCode)
      .send({ message: typeof error === 'object' ? error.message : error })
  }
}
export default ResponseSender;
