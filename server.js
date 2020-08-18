const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema'); // require custom js file

const app = express();

// Allow CORS-origin
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
})