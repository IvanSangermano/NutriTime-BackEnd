const { request, response } = require('express');
const Routine = require('../Model/routine');

const getRoutines = async (req = request, res = response) => {
  try {
    const { userId } = req.query;
    let termsRoutine = {};

    if (userId) {
      termsRoutine.userId = userId;
    }

    const routines = await Routine.find(termsRoutine).populate("userId");
    res.send(routines);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getRoutine = async (req = request, res = response) => {
  try {
    const routineId = req.params.id;
    const routine = await Routine.findById(routineId).populate("userId");

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
    const routineExistUserId = await Routine.findOne({
      userId: req.body.userId,
    });
    const routineExistName = await Routine.findOne({
      name: req.body.name,
    });

    if (routineExistUserId) {
      res.status(400).json({
        error: 'Error, there is a routine with that user',
      });
    } else {
      if (routineExistName) {
        res.status(400).json({
          error: 'Error, there is a routine with that name',
        });
      } else {
        await routine.save();
        res.status(201).json({ message: 'Routine added successfully', data: routine });
      }
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

    const routineExistUserId = await Routine.findOne({
        userId: req.body.userId,
      _id: { $ne: routineId },
    });
    const routineExistName = await Routine.findOne({
      name: req.body.name,
    _id: { $ne: routineId },
  });

    if (routineExistUserId) {
      return res.status(400).json({
        error: 'Error, existing routine',
      });
    } else {
      if (routineExistName) {
        res.status(400).json({
          error: 'Error, there is a routine with that name',
        });
      } else {
        routine = await Routine.findByIdAndUpdate(routineId, routine, {new: true,});
      }
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

    if (routine) {
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
