const { request, response } = require('express');
const Permission = require('../Model/permission');

const getPermission = async (req = request, res = response) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findById(permissionId);

    if (permission) {
      res.json(permission);
    } else {
      res.status(404).json({ error: 'Permission doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const postPermission = async (req = request, res = response) => {
  try {
    const permission = new Permission(req.body);
    await health.save();
    res.status(201).json({ message: 'Permission added successfully', data: permission });
    }
   catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putPermission = async (req = request, res = response) => {
  try {
    const permissionId = req.params.id;
    let permission = req.body;

    permission = await Permission.findByIdAndUpdate(permissionId, permission, {
        new: true,
      });
    
    if (permission) {
      res.json({ data: permission });
    } else {
      res.status(404).json({ error: 'Permission doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deletePermission = async (req = request, res = response) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findByIdAndDelete(permissionId);

    if (permission) {
      res.json({ message: 'Permission deleted successfully', data: permission });
    } else {
      res.status(404).json({ error: 'Permission doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

module.exports = {
  getPermission,
  getPermission,
  postPermission,
  putPermission,
  deletePermission
};