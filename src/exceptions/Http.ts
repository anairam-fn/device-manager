export class HttpError extends Error {
  code: number
  constructor (message: string , statusCode: number) {
    super(message)
    this.name = this.constructor.name
    this.code = statusCode
  }
}

export default HttpError
