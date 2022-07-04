const { Schema, model } = require('mongoose');

const ExerciseSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  duration: {
    type: String,
    required: [true, 'duration is required'],
  },
  set: {
    type: String,
    required: [true, 'Set is required'],
  },
});

module.exports = model('Exercise', ExerciseSchema);
