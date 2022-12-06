const User = require('../Model/user');
const Permission = require('../Model/permission');
const bcrypt = require('bcrypt');

const pwd = 'test1234';

const seeder = async () => {
  const existingUser = await User.findOne();
  if (existingUser) return;
  console.log('No user was found, creating one...');

  const permission = new Permission()
  permission.role = "admin";
  permission.addUser= true;
  permission.modifyUser = true;
  permission.deleteUser = true;
  permission.addHealth= true;
  permission.modifyHealth = true;
  permission.deleteHealth = true;
  permission.addExcercises= true;
  permission.modifyExcercises= true;
  permission.deleteExcercises= true;
  permission.addRoutines= true;
  permission.modifyRoutines = true;
  permission.deleteRoutines = true;
  permission.addSuscription= true;
  permission.modifySuscription = true;
  permission.deleteSuscription= true;
  await permission.save()

  const user = new User();
  user.email = 'user@mail.com';
  user.name = 'Lionel';
  user.lastName = 'Messi';
  user.phone = '1231231231';
  user.dni = '12312323';
  user.status = true;
  user.permissionRole = "admin";
  user.password = await bcrypt.hash(pwd, 12);

  await user.save();
  console.log(`[User created] \nemail: ${user.email} \npassword: ${pwd} `);
};

module.exports = seeder;
