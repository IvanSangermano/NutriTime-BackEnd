const { Schema, model } = require('mongoose');

const RoutineSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  breakDuration: {
    type: Array,
    required: [true, 'Break duration is required'],
  },
  exercisesDuration: {
    type: Array,
    required: [true, 'Exercise duration is required'],
  },
  exercises: {
    type: Array,
    required: [true, 'exercises is required'],
  },
});

module.exports = model('Routine', RoutineSchema);
