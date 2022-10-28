const { Schema, model } = require('mongoose');

const RoutineSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  exerciseRoutineId: {
    type: Schema.Types.ObjectId,
    ref: 'ExerciseRoutine',
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
  }
});

module.exports = model('Routine', RoutineSchema);
