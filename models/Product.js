import { model, Schema, models } from 'mongoose'
import shortid from 'shortid'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate(),
  },
  mediaUrl: {
    type: String,
    required: true,
  },
})

export default models.Product || model('Product', ProductSchema)
