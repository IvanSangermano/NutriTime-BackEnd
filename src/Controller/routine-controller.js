const { request, response } = require('express');
const Routine = require('../Model/routine');

const getRoutines = async (req = request, res = response) => {
  try {
    const { userId, breakDuration, exercisesDuration, exercises } = req.query;
    let termsRoutine = {};

    if (userId) {
      termsRoutine.userId = userId;
    }
    if (breakDuration) {
      const regex = new RegExp(breakDuration, 'i');
      termsRoutine.breakDuration = { $regex: regex };
    }
    if (exercisesDuration) {
      const regex = new RegExp(exercisesDuration, 'i');
      termsRoutine.exercisesDuration = { $regex: regex };
    }
    if (exercises) {
      const regex = new RegExp(exercises, 'i');
      termsRoutine.exercises = { $regex: regex };
    }

    const routines = await Routine.find(termsRoutine);
    res.send(routines);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getRoutine = async (req = request, res = response) => {
  try {
    const routineId = req.params.id;
    const routine = await Routine.findById(routineId);

    if (routine) {
      res.json(routine);
    } else {
      res.status(404).json({ error: 'Routine doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postRoutine = async (req = request, res = response) => {
  try {
    const routine = new Routine(req.body);
    const routineExist = await Routine.findOne(routine);

    if (routineExist) {
      res.status(400).json({
        error: 'Error, existing routine',
      });
    } else {
      await routineExist.save();
      res
        .status(201)
        .json({ message: 'Routine added successfully', data: routine });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putRoutine = async (req = request, res = response) => {
  try {
    const routineId = req.params.id;
    let routine = req.body;

    const routineExist = await Routine.findOne({
      breakDuration: req.body.breakDuration,
      exercisesDuration: req.body.exercisesDuration,
    });

    if (routineExist) {
      return res.status(400).json({ error: 'Error, existing Routine' });
    } else {
      routine = await Routine.findByIdAndUpdate(routineId, routine, {
        new: true,
      });
    }
    if (routine) {
      res.json({ data: routine });
    } else {
      res.status(404).json({ error: 'Routine doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteRoutine = async (req = request, res = response) => {
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
  getRoutine,
  getRoutines,
  postExercise,
  putRoutine,
  deleteRoutine,
};
