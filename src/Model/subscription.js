const { Schema, model } = require('mongoose');

const SubscriptionSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dayOfSubscription: {
    type: Date,
    required: [true, `Day of subscription is required`]
  },
  dayOfExpiration: {
    type: Date,
    required: [true, `Day of expiration is required`]
  },
  typeOfSubscription: {
    type: String,
    required: [true, `Type of subscription is required`]
  }
});

module.exports = model('Subscription', SubscriptionSchema);
