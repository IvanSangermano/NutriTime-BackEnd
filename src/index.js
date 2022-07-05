const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const routerUsers = require('./Router/user-route');
const routerHealth = require('./Router/health-route');
const seeder = require('./Helpers/seeder');
const { ConnectionDB } = require('./Database/config');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());
app.use(cors());

app.use('/users', routerUsers);
app.use('/health', routerHealth);

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);
  await ConnectionDB();
  await seeder();
});
