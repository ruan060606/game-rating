const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const schema = require('./Schema/schema');
require('./services/passport');
const { mongoURI } = require('./config/keys');

const app = express();

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => console.log('connected to database'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

authRoute(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// PORT 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
