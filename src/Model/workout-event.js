const { Schema, model } = require('mongoose');

const WorkoutEventSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  places: {
    type: String,
    required: [true, 'places is required'],
  },
  duration: {
    type: String,
    required: [true, 'duration is required'],
  },
  location: {
    type: String,
    required: [true, 'location is required'],
  },
  theme: {
    type: String,
    required: [true, 'theme is required'],
  },
  members: {
    type: Array,
    required: [true, 'members is required'],
  },
});

module.exports = model('WorkoutEvent', WorkoutEventSchema);
