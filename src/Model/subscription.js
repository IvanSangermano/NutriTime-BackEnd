const { Schema, model } = require('mongoose');

const SubscriptionSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Boolean,
    required: [true, 'status is required'],
  },
});

module.exports = model('Subscription', SubscriptionSchema);
