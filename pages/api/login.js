import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/User'

export default async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(404).send('No user exists with that email')
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      return res.status(401).send('Passwords do not match')
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.json(token)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging in user')
  }
}
