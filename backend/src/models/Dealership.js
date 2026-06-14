import mongoose from 'mongoose';

const dealershipSchema = new mongoose.Schema(
  {
    OrganisationName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    dealerType: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    financing: {
      type: String,
      required: true,
      trim: true,
    },
    agreement: {
      type: String,
      required: true,
      trim: true,
    },
    bank_name: {
      type: String,
      required: true,
      trim: true,
    },
    account_number: {
      type: String,
      required: true,
      trim: true,
    },
    ifsc_code: {
      type: String,
      required: true,
      trim: true,
    },
    holder_name: {
      type: String,
      required: true,
      trim: true,
    },
    // Files metadata (rather than buffer/multipart storage since it's mock and JSON format requirement)
    aadhaar: {
      name: { type: String },
      size: { type: Number },
    },
    pan: {
      name: { type: String },
      size: { type: Number },
    },
    trade: {
      name: { type: String },
      size: { type: Number },
    },
    gst: {
      name: { type: String },
      size: { type: Number },
    },
    photo: {
      name: { type: String },
      size: { type: Number },
    },
    shop_photo: {
      name: { type: String },
      size: { type: Number },
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Dealership = mongoose.model('Dealership', dealershipSchema);

export default Dealership;
