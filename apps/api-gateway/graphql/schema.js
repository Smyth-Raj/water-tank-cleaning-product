const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const axios = require('axios');

// In-memory booking data as fallback
const bookings = [];

const BookingType = new GraphQLObjectType({
  name: 'Booking',
  fields: {
    id: { type: GraphQLString },
    customer: { type: GraphQLString },
    cleaner: { type: GraphQLString },
    time: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    bookings: {
      type: new GraphQLList(BookingType),
      async resolve() {
        try {
          const res = await axios.get('http://localhost:4002/bookings');
          return res.data;
        } catch (err) {
          console.error('Error fetching bookings:', err.message);
          return bookings; // fallback to local data
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { email, password }) {
        try {
          const res = await axios.post('http://localhost:4001/login', { email, password });
          return res.data.token;
        } catch (err) {
          throw new Error('Login failed: ' + (err.response?.data?.error || err.message));
        }
      },
    },
    createBooking: {
      type: BookingType,
      args: {
        customer: { type: GraphQLNonNull(GraphQLString) },
        cleaner: { type: GraphQLNonNull(GraphQLString) },
        time: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { customer, cleaner, time }) {
        try {
          const res = await axios.post('http://localhost:4002/commands/create', {
            customer,
            cleaner,
            time,
          });

          return res.data.booking;
        } catch (err) {
          throw new Error('Create booking failed: ' + (err.response?.data?.error || err.message));
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
