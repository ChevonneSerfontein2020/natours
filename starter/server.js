const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  // .connect(process.env.DATABASE_LOCAL, {} <-- if using local database
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection successful!');
});

// Port the server will listen on
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

