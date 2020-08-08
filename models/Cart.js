import { Schema, models, model } from 'mongoose'

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
})

export default models.Cart || model('Cart', CartSchema)
