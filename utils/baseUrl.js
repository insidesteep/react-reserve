const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://deploy.ru'
    : 'http://localhost:3000'

export default baseUrl