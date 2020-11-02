const { mongoose } = require('../connection');

const LeaseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['studio'],
    },
    size: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rooms: {
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
