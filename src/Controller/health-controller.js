const { request, response } = require('express');
const Health = require('../Model/health');

const getHealths = async (req = request, res = response) => {
  try {
    const { userId, day} = req.query;
    let termsHealth = {};

    if (userId) {
      termsHealth.userId = userId
    }
    if (day) {
      const initialDate = new Date(day)
      const FinalDate = new Date(day)
      FinalDate.setDate(FinalDate.getDate()+1)
      termsHealth.day = {$gte:initialDate, $lt:FinalDate}
    }

    const healths = await Health.find(termsHealth);
    res.send(healths);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getHealth = async (req = request, res = response) => {
  try {
    const healthId = req.params.id;
    const health = await Health.findById(healthId);

    if (health) {
      res.json(health);
    } else {
      res.status(404).json({ error: 'Health doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postHealth = async (req = request, res = response) => {
  try {
    const health = new Health(req.body);
    const healthExist = await Health.findOne({
        userId: req.body.userId,
      day: req.body.day,
    });
    if (healthExist) {
      res.status(400).json({
        error: 'Error, existing user',
      });
    } else {
      await health.save();
      res.status(201).json({ message: 'Health added successfully', data: health });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putHealth = async (req = request, res = response) => {
  try {
    const healthId = req.params.id;
    let health = req.body;

    const healthExist = await Health.findOne({
        userId: req.body.userId,
        day: req.body.day,
      _id: { $ne: healthId },
    });
    if (healthExist) {
      return res.status(400).json({
        error: 'Error, existing health',
      });
    } else {
        health = await Health.findByIdAndUpdate(healthId, health, {
        new: true,
      });
    }
    if (health) {
      res.json({ data: health });
    } else {
      res.status(404).json({ error: 'health doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteHealth = async (req = request, res = response) => {
  try {
    const healthId = req.params.id;
    const health = await Health.findByIdAndDelete(healthId);

    if (health) {
      res.json({ message: 'Health deleted successfully', data: health });
    } else {
      res.status(404).json({ error: 'Health doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getHealths,
  getHealth,
  postHealth,
  putHealth,
  deleteHealth
};