const { request, response } = require('express');
const Exercise = require('../Model/exercise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getExercises = async (req = request, res = response) => {
  try {
    const { name, duration, set } = req.query;
    let termsExercise = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsExercise.name = { $regex: regex };
    }
    if (duration) {
      const regex = new RegExp(duration, 'i');
      termsExercise.duration = { $regex: regex };
    }
    if (set) {
      const regex = new RegExp(set, 'i');
      termsExercise.set = { $regex: regex };
    }

    const exercises = await Exercise.find(termsExercise);
    res.send(exercises);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getExercise = async (req = request, res = response) => {
  try {
    const exerciseId = req.params.id;
    const exercise = await Exercise.findById(exerciseId);

    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ error: 'Exercise doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postExcercise = async (req = request, res = response) => {
  try {
    const exercise = new Exercise(req.body);
    const exerciseExist = await Exercise.findOne(exercise);

    if (exerciseExist) {
      res.status(400).json({
        error: 'Error, existing exercise',
      });
    } else {
      await exercise.save();
      res
        .status(201)
        .json({ message: 'Exercise added successfully', data: exercise });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putExercise = async (req = request, res = response) => {
  try {
    const exerciseId = req.params.id;
    let exercise = req.body;

    const exerciseExist = await Exercise.findOne(exerciseId);

    if (exerciseExist) {
      return res.status(400).json({ error: 'Error, existing Exercise' });
    } else {
      exercise = await Exercise.findByIdAndUpdate(exerciseId, exercise, {
        new: true,
      });
    }
    if (exercise) {
      res.json({ data: exercise });
    } else {
      res.status(404).json({ error: 'Exercise doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteExercise = async (req = request, res = response) => {
  try {
    const exerciseId = req.params.id;
    const exercise = await Exercise.findByIdAndDelete(exerciseId);

    if (exercise) {
      res.json({ message: 'Exercise deleted successfully', data: exercise });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getExercises,
  getExercise,
  postExcercise,
  putExercise,
  deleteExercise,
};
