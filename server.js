const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// const serverURI = 'http://localhost:' + PORT;
const mongoURI = process.env.MONGO_URI;

// app.listen(PORT, () => {
//     console.log('Server running at: ' + serverURI)
// });
app.listen(PORT, () => {
  console.log("Server is running...");
});

// mongoose
// .set('useCreateIndex', true)
// .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {console.log('Connected to Mongo-database')})
mongoose
  .set("useCreateIndex", true)
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  