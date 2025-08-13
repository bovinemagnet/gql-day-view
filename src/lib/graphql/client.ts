import { ApolloClient, InMemoryCache, gql, from } from '@apollo/client';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

// GraphQL schema definition
const typeDefs = gql`
  type TimeSlot {
    startTime: String!
    endTime: String!
    duration: Int!
    dayOfWeek: String!
    timeZone: String
  }

  type Session {
    id: ID!
    name: String!
    description: String
    sessionType: String!
    campus: String!
    slots: [TimeSlot!]!
  }

  type ResourceTimetable {
    timetableType: String!
    code: String!
    name: String!
    description: String
    sessions: [Session!]!
  }

  type Query {
    getResourceTimetables: [ResourceTimetable!]!
  }
`;

// Static mock data matching the provided example
const mockData = {
  getResourceTimetables: [
    {
      timetableType: "STAFF",
      code: "1234",
      name: "John Doe",
      description: null,
      sessions: [
        {
          id: "205130",
          name: "01",
          description: "Research Paper",
          sessionType: "Lecture",
          campus: "On Campus",
          slots: [
            {
              startTime: "2020-02-26T14:30:00",
              endTime: "2020-02-26T16:30:00",
              duration: 120,
              dayOfWeek: "WEDNESDAY",
              timeZone: null
            },
            {
              startTime: "2020-02-26T14:30:00",
              endTime: "2020-02-26T16:30:00",
              duration: 120,
              dayOfWeek: "WEDNESDAY",
              timeZone: "Australia/Melbourne"
            }
          ]
        }
      ]
    },
    {
      timetableType: "STAFF",
      code: "5678",
      name: "Jane Smith",
      description: "Senior Lecturer",
      sessions: [
        {
          id: "205131",
          name: "02",
          description: "Group Discussion",
          sessionType: "Tutorial",
          campus: "Online",
          slots: [
            {
              startTime: "2020-02-26T10:00:00",
              endTime: "2020-02-26T11:30:00",
              duration: 90,
              dayOfWeek: "WEDNESDAY",
              timeZone: "Australia/Melbourne"
            }
          ]
        }
      ]
    }
  ]
};

// Create mock resolvers that return the static data
const mocks = {
  Query: () => mockData
};

// Create executable schema with mocks for fallback
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema, mocks, preserveResolvers: true });

// Try to connect to real GraphQL endpoint, fallback to mocks
const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT || '/graphql', // Replace with your actual endpoint
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError) {
    console.warn('GraphQL endpoint unavailable, falling back to mock data');
    // Return mock data on network error
    return new SchemaLink({ schema: schemaWithMocks }).request(operation);
  }
});

// Apollo Client with fallback to mock schema
export const apolloClient = new ApolloClient({
  link: from([
    errorLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all'
    }
  }
});

// GraphQL queries
export const GET_RESOURCE_TIMETABLES = gql`
  query GetResourceTimetables {
    getResourceTimetables {
      timetableType
      code
      name
      description
      sessions {
        id
        name
        description
        sessionType
        campus
        slots {
          startTime
          endTime
          duration
          dayOfWeek
          timeZone
        }
      }
    }
  }
`;