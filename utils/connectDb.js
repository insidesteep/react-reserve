import mongoose from 'mongoose'

const connection = {}

const connectDB = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection')

    return
  }

  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })

  console.log('DB Connected')

  connection.isConnected = db.connections[0].readyState
}

export default connectDB