const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');
const userRoutes = require('./src/routes/userRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const typeRoutes = require('./src/routes/typeRoutes');
const stateRoutes = require('./src/routes/stateRoutes')
const deviceRoutes = require('./src/routes/deviceRoutes');
const repairOrdersRoutes = require('./src/routes/repairOrdersRoutes');
const repairRoutes = require('./src/routes/repairRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', typeRoutes);
app.use('/api', stateRoutes);
app.use('/api', deviceRoutes);
app.use('/api', repairOrdersRoutes);
app.use('/api', repairRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
