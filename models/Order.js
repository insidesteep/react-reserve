import { Schema, models, model } from 'mongoose'

const OrderSchema = new Schema(
  {
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
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export default models.Order || model('Order', OrderSchema)
