const mongoose = require('mongoose');

const LeaseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxTenants: {
      type: Number,
      required: true,
    },
    tenants: {
      type: Array,
      default: [],
    },
    tokenURI: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'leases',
    timestamps: true,
  },
);

const Lease = mongoose.model('Lease', LeaseSchema);

module.exports = { Lease };
