const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://react-reserve-git-master.insidesteep.vercel.app'
    : 'http://localhost:3000'

export default baseUrl