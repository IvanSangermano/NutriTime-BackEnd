const { Schema, model } = require('mongoose');

const ExerciseRoutineSchema = Schema({
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
});

module.exports = model('ExerciseRoutine', ExerciseRoutineSchema);
