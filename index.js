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

app.get('/', (req, res) => {
  res.send('Server');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

authRoute(app);

// PORT 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
