import mongoose from 'mongoose'

const AccountDetails = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingAddress: {
    name: String,
    area: String,
    state: String,
    houseNo: String,
  },
  billingAddress: {
    name: String,
    area: String,
    state: String,
    houseNo: String,
  },
})

export default mongoose.models.AccountDetails ||
  mongoose.model('AccountDetails', AccountDetails)
