const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); // require custom js file

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
})