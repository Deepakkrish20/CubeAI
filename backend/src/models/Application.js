import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    loanType: {
      type: String,
      required: true,
      enum: [
        'e-auto',
        'battery',
        'solar',
        'fleet',
        'e-rickshaw',
        'e-scooter',
        'used-car',
        'lap',
        'lcv',
      ],
    },
    amount: {
      type: Number,
      required: true,
      min: 10000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
