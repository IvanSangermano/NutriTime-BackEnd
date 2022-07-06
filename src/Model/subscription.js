const { Schema, model } = require('mongoose');

const SubscriptionSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  day: {
    type: Date,
    required: [true, `Day is required`]
  },
});

module.exports = model('Subscription', SubscriptionSchema);
