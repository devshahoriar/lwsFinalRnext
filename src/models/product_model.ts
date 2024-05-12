import mongoose from 'mongoose'

const Product = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
    longDescription: String,
    visited: Number
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Product || mongoose.model('Product', Product)
