const { mongoose } = require('@libs/mongo/connection');

const SmartContractSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    erc: {
      type: String,
      required: true,
      enum: ['erc20', 'erc721'],
    },
    address: {
      type: String,
      required: true,
    },
    abi: {
      type: Array,
      required: true,
    },
  },
  {
    collection: 'smart-contracts',
    timestamps: true,
  },
);

const SmartContract = mongoose.model('SmartContract', SmartContractSchema);

module.exports = { SmartContract };
