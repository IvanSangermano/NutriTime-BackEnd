const User = require('../Model/user');
const bcrypt = require('bcrypt');

const pwd = 'test1234';

const seeder = async () => {
  const existingUser = await User.findOne();
  if (existingUser) return;
  console.log('No user was found, creating one...');

  const user = new User();
  user.email = 'user@mail.com';
  user.name = 'John';
  user.lastName = 'Messi';
  user.phone = '1231231231';
  user.dni = '12312323';
  user.status = true;
  user.password = await bcrypt.hash(pwd, 12);

  await user.save();
  console.log(`[User created] \nemail: ${user.email} \npassword: ${pwd} `);
};

module.exports = seeder;
