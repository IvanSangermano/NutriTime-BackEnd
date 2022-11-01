const { Schema, model } = require('mongoose');

const ExerciseRoutineSchema = Schema({
  routineId: {
    type: Schema.Types.ObjectId,
    ref: 'Routine',
  },
  day: {
    type: String,
    required: [true, 'Day is required'],
  },
  breakDuration: {
    type: String,
    required: [true, 'Break duration is required'],
  },
  duration: {
    type: String,
    required: [true, 'Exercise duration is required'],
  },
  exerciseId: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  position: {
    type: String,
  },
});

module.exports = model('ExerciseRoutine', ExerciseRoutineSchema);
