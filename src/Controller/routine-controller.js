const { request, response } = require('express');
const Routine = require('../Model/routine');

const getRoutines = async (req = request, res = response) => {
  try {
    const { userId } = req.query;
    let termsRoutine = {};

    if (userId) {
      termsRoutine.userId = userId;
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
    const routineExist = await Routine.findOne({
      userId: req.body.userId,
      exerciseRoutineId: req.body.exerciseRoutineId,
      position: req.body.position
    });
    if (routineExist) {
      res.status(400).json({
        error: 'Error, existing routine',
      });
    } else {
      await routine.save();
      res.status(201).json({ message: 'Routine added successfully', data: routine });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error has ocurred' });
  }
};

const putRoutine = async (req = request, res = response) => {
  try {
    const routineId = req.params.id;
    let routine = req.body;

    const routineExist = await Routine.findOne({
        userId: req.body.userId,
        exerciseRoutineId: req.body.exerciseRoutineId,
        position: req.body.position,
      _id: { $ne: routineId },
    });
    if (routineExist) {
      return res.status(400).json({
        error: 'Error, existing routine',
      });
    } else {
      routine = await Routine.findByIdAndUpdate(routineId, routine, {new: true,});
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
    const routineId = req.params.id;
    const routine = await Routine.findByIdAndDelete(routineId);

    if (exercise) {
      res.json({ message: 'Routine deleted successfully', data: routine });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getRoutine,
  getRoutines,
  postRoutine,
  putRoutine,
  deleteRoutine,
};
