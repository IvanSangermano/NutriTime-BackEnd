const { Schema, model } = require('mongoose');

const ExerciseRoutineSchema = Schema({
  routineId: {
    type: Schema.Types.ObjectId,
    ref: 'Routine',
  },
  breakDuration: {
    type: String,
    required: [true, 'Break duration is required'],
  },
  duration: {
    type: String,
    required: [true, 'Exercise duration is required'],
  },
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
});

module.exports = model('ExerciseRoutine', ExerciseRoutineSchema);
