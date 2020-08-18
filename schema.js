const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} = require('graphql');

// describe our types data. We have luanches and rockets type

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLInt },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    })
});

// RocketType
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res => {
                        return res.data
                    })
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                    .then(res => {
                        return res.data
                    });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})