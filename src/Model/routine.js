const { Schema, model } = require('mongoose');

const RoutineSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String
  }
});

module.exports = model('Routine', RoutineSchema);
