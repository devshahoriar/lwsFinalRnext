import mongoose from 'mongoose'

const WishList = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.WishList || mongoose.model('WishList', WishList)
