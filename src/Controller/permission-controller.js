const { request, response } = require('express');
const Permission = require('../Model/permission');


const getPermissions = async (req = request, res = response) => {
  try {
    const { role  } = req.query;
    let termsPermission = {};
    if (role) {
      const regex = new RegExp(role, 'i');
      termsPermission.role = { $regex: regex };
    }

    const permissions = await Permission.find(termsPermission);
    res.send(permissions);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

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

    const permissionExist = await Permission.findOne({
      role: req.body.role,
    });
    if (permissionExist) {
      res.status(400).json({
        error: 'Error, existing permission',
      });
    } else {
      await permission.save();
      res.status(201).json({ message: 'Permission added successfully', data: permission });
      }
    }
   catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const putPermission = async (req = request, res = response) => {
  try {
    const permissionId = req.params.id;
    let permission = req.body;

    const permissionExist = await Permission.findOne({
      role: req.body.role,
      _id: { $ne: permissionId },
    });

    if (permissionExist) {
      return res.status(400).json({
        error: 'Error, existing permission',
      });
    } else {
      permission = await Permission.findByIdAndUpdate(permissionId, permission, {
        new: true,
      });
    }

    if (permission) {
      res.json({message: 'Permission modify successfully', data: permission });
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
  getPermissions,
  getPermission,
  postPermission,
  putPermission,
  deletePermission
};