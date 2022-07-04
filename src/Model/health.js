const { Schema, model } = require('mongoose');

const HealthSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
  },
});

module.exports = model('Health', HealthSchema);
