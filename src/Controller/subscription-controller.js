const { request, response } = require('express');
const Subscription = require('../Model/subscription');

const getSubscriptions = async (req = request, res = response) => {
  try {
    const { userId } = req.query;
    let termSubscription = {};

    if (userId) {
      termSubscription.userId = userId;
    }

    const subscriptions = await Subscription.find(termSubscription).populate("userId");
    res.send(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getSubscription = async (req = request, res = response) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);

    if (subscription) {
      res.json(subscription);
    } else {
      res.status(404).json({ error: 'Subscription doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postSubscription = async (req = request, res = response) => {
  try {
    const subscription = new Subscription(req.body);
    const subscriptionExist = await Subscription.findOne({
        userId : req.body.userId,
        dayOfSubscription : req.body.dayOfSubscription,
        dayOfExpiration : req.body.dayOfExpiration,
        typeOfSubscription : req.body.typeOfSubscription
    });
    if (subscriptionExist) {
      res.status(400).json({
        error: 'Error, existing subscription',
      });
    } else {
      await subscription.save();
      res.status(201).json({ message: 'Subscription added successfully', data: subscription });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putSubscription = async (req = request, res = response) => {
  try {
    const subscriptionId = req.params.id;
    let subscription = req.body;

    const subscriptionExist = await Subscription.findOne({
      userId : req.body.userId,
      dayOfSubscription : req.body.dayOfSubscription,
      dayOfExpiration : req.body.dayOfExpiration,
      typeOfSubscription : req.body.typeOfSubscription,
        _id: { $ne: subscriptionId },
    });
    if (subscriptionExist) {
      return res.status(400).json({
        error: 'Error, existing subscription',
      });
    } else {
      subscription = await Subscription.findByIdAndUpdate(subscriptionId, subscription, {
        new: true,
      });
    }
    if (subscription) {
      res.json({ message: 'Subscription modify successfully', data: subscription });
    } else {
      res.status(404).json({ error: 'Subscription doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteSubscription = async (req = request, res = response) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findByIdAndDelete(subscriptionId);

    if (subscription) {
      res.json({ message: 'Subscription deleted successfully', data: subscription });
    } else {
      res.status(404).json({ error: 'Subscription doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
    getSubscriptions,
    getSubscription,
    postSubscription,
    putSubscription,
    deleteSubscription
};
