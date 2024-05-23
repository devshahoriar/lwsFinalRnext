import mongoose from 'mongoose'

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderAddress: {
      fName: String,
      lName: String,
      company: String,
      country: String,
      state: String,
      city: String,
      phone: String,
      Email: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Order || mongoose.model('Order', Order)
