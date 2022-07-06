const { Schema, model } = require('mongoose');

const ExerciseSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  area: {
    type: String,
    required: [true, 'duration is required'],
  },
  expecifyMuscle: {
    type: String,
    required: [true, 'Set is required'],
  },
});

module.exports = model('Exercise', ExerciseSchema);
