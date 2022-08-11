const { Schema, model } = require('mongoose');

const RoutineSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  exercises: {
    type: Schema.Types.ObjectId,
    ref: 'ExerciseRoutine',
  },
});

module.exports = model('Routine', RoutineSchema);
