const { Schema, model } = require('mongoose');

const RoutineSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  duration: {
    type: String,
    required: [true, 'duration is required'],
  },
  exercises: {
    type: Array,
    required: [true, 'exercises is required'],
  },
});

module.exports = model('Routine', RoutineSchema);
