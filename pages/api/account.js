import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import connectDB from '../../utils/connectDb'

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res)
      break
    case 'PUT':
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed`)
  }
}

async function handleGetRequest(req, res) {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token')
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )

    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).send('User not found')
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(403).send('Invalid token')
  }
}

async function handlePutRequest(req, res) {
  try {
    const { _id, role } = req.body

    await User.findByIdAndUpdate({ _id }, { role })

    res.status(203).send('User updated')
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}
