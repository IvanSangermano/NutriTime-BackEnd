const { request, response } = require('express');
const Health = require('../Model/health');

const getHealths = async (req = request, res = response) => {
  try {
    const { userId, day, macroCheck} = req.query;
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
    if(macroCheck){
      termsHealth.macroCheck = macroCheck
    }

    const healths = await Health.find(termsHealth).populate("userId");
    res.send(healths);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
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
        error: 'Error, existing Health',
      });
    } else {
      if(health.macroCheck == false)
      {
        health.stage = null
        health.activity = null
      }
      await health.save();
      res.status(201).json({ message: 'Health added successfully', data: await Health.findOne({
        userId: req.body.userId,
        day: req.body.day,
      }).populate("userId") });
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
        if(health.macroCheck == false)
        {
          health.stage = null
          health.activity = null
        }
        health = await Health.findByIdAndUpdate(healthId, health, {
        new: true,
      });
    }
    if (health) {
      res.json({ message: 'Health modify successfully', data: await Health.findOne({
        userId: req.body.userId,
        day: req.body.day,
      }).populate("userId") });
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