const { Schema } = require('mongoose');

const SmartContractSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
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
      type: String,
      required: true,
    },
  },
  {
    collection: 'smart-contracts',
  },
);

module.exports = {
  SmartContractSchema,
};
