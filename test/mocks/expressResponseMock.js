module.exports = () => {
  const response = {
    set: jest.fn(),
    status: jest.fn(),
    send: jest.fn()
  }

  response.set.mockReturnValue(response)
  response.status.mockReturnValue(response)
  response.send.mockReturnValue(response)

  return response
}
