const { request, response } = require('express');
const WorkoutEvent = require('../Model/workout-event');

const getWorkoutEvents = async (req = request, res = response) => {
  try {
    const { name, places, duration, location, theme, members } = req.query;
    let termsWorkoutEvent = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsWorkoutEvent.name = { $regex: regex };
    }
    if (places) {
      const regex = new RegExp(places, 'i');
      termsWorkoutEvent.places = { $regex: regex };
    }
    if (duration) {
      const regex = new RegExp(duration, 'i');
      termsWorkoutEvent.duration = { $regex: regex };
    }
    if (location) {
      const regex = new RegExp(location, 'i');
      termsWorkoutEvent.location = { $regex: regex };
    }
    if (theme) {
      const regex = new RegExp(theme, 'i');
      termsWorkoutEvent.theme = { $regex: regex };
    }
    if (members) {
      const regex = new RegExp(members, 'i');
      termsWorkoutEvent.members = { $regex: regex };
    }

    const workoutEvent = await WorkoutEvent.find(termsWorkoutEvent);
    res.send(workoutEvent);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    const workoutEvent = await WorkoutEvent.findById(workoutEventId);

    if (workoutEvent) {
      res.json(workoutEvent);
    } else {
      res.status(404).json({ error: 'Workout Event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEvent = new WorkoutEvent(req.body);
    const workoutEventExist = await WorkoutEvent.findOne(workoutEvent);

    if (workoutEventExist) {
      res.status(400).json({
        error: 'Error, existing Workout Event',
      });
    } else {
      await workoutEvent.save();
      res.status(201).json({
        message: 'Workout Event added successfully',
        data: workoutEvent,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    let workoutEvent = req.body;

    const workoutEventExist = await WorkoutEvent.findOne({
      name: req.body.name,
      location: req.body.location,
      theme: req.body.theme,
      places: req.body.places,
    });
    if (workoutEventExist) {
      return res.status(400).json({
        error: 'Error, existing workout Event',
      });
    } else {
      workoutEvent = await WorkoutEvent.findByIdAndUpdate(
        workoutEventId,
        workoutEvent,
        {
          new: true,
        }
      );
    }
    if (workoutEvent) {
      res.json({ data: workoutEvent });
    } else {
      res.status(404).json({ error: 'Work Event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteWorkoutEvent = async (req = request, res = response) => {
  try {
    const workoutEventId = req.params.id;
    const workoutEvent = await WorkoutEvent.findByIdAndDelete(workoutEventId);

    if (workoutEvent) {
      res.json({
        message: 'Workout Event deleted successfully',
        data: workoutEvent,
      });
    } else {
      res.status(404).json({ error: 'Workout Event doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getWorkoutEvent,
  getWorkoutEvents,
  putWorkoutEvent,
  postWorkoutEvent,
  deleteWorkoutEvent,
};
