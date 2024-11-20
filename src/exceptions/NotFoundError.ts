import HttpError from "./Http"

class NotFoundError extends HttpError {
  constructor (message: string) {
    super(message, 404)
  }
}

export default NotFoundError
