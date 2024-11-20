import HttpError from '../../../src/exceptions/Http'
import NotFoundError from '../../../src/exceptions/NotFoundError'

describe('Http Exceptions Error', () => {
  test('Default HTTP Exception', () => {
    const message = 'This error'
    const statusCode = 500

    const thrownError = () => {
      throw new HttpError(message, statusCode)
    }

    expect(thrownError).toThrow(HttpError)

    try {
      thrownError()
    } catch (error: any) {
      expect(error).toHaveProperty('message', message)
      expect(error).toHaveProperty('code', statusCode)
      expect(error).toBeInstanceOf(HttpError)
      expect(error.name).toBe('HttpError')
    }
  })

  test('NotFound HTTP Exception', () => {
    const message = 'nothing'

    const thrownError = () => {
      throw new NotFoundError(message)
    }

    expect(thrownError).toThrow(NotFoundError)

    try {
      thrownError()
    } catch (error: any) {
      expect(error).toHaveProperty('message', message)
      expect(error).toHaveProperty('code', 404)
      expect(error).toBeInstanceOf(HttpError)
      expect(error.name).toBe('NotFoundError')
    }
  })
})