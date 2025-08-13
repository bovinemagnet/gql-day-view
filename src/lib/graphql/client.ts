import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';

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

// Mock resolvers for demonstration
const mocks = {
  TimeSlot: () => ({
    startTime: () => {
      const today = new Date();
      const hours = Math.floor(Math.random() * 10) + 8; // 8 AM to 6 PM
      const minutes = Math.random() > 0.5 ? '00' : '30';
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, parseInt(minutes));
      return startDate.toISOString();
    },
    endTime: () => {
      const today = new Date();
      const hours = Math.floor(Math.random() * 10) + 9; // 9 AM to 7 PM
      const minutes = Math.random() > 0.5 ? '00' : '30';
      const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, parseInt(minutes));
      return endDate.toISOString();
    },
    duration: () => Math.floor(Math.random() * 3 + 1) * 60, // 60, 120, or 180 minutes
    dayOfWeek: () => {
      const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
      return days[new Date().getDay() - 1] || 'MONDAY';
    },
    timeZone: () => Math.random() > 0.5 ? 'Australia/Melbourne' : undefined
  }),
  Session: () => ({
    id: () => Math.random().toString(36).substr(2, 6),
    name: () => {
      const names = ['01', '02', '03', 'Tutorial', 'Lab Session', 'Workshop'];
      return names[Math.floor(Math.random() * names.length)];
    },
    description: () => {
      const descriptions = [
        'Research Paper',
        'Group Discussion',
        'Practical Exercise',
        'Theory Review',
        'Assessment Task',
        'Project Work'
      ];
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    },
    sessionType: () => {
      const types = ['Lecture', 'Tutorial', 'Lab', 'Workshop', 'Seminar'];
      return types[Math.floor(Math.random() * types.length)];
    },
    campus: () => {
      const campuses = ['On Campus', 'Online', 'Hybrid'];
      return campuses[Math.floor(Math.random() * campuses.length)];
    },
    slots: () => new Array(Math.floor(Math.random() * 2) + 1) // 1-2 slots per session
  }),
  ResourceTimetable: () => ({
    timetableType: () => {
      const types = ['STAFF', 'STUDENT', 'ROOM'];
      return types[Math.floor(Math.random() * types.length)];
    },
    code: () => Math.floor(Math.random() * 9000 + 1000).toString(),
    name: () => {
      const names = ['John Doe', 'Jane Smith', 'Dr. Wilson', 'Prof. Johnson', 'Sarah Brown'];
      return names[Math.floor(Math.random() * names.length)];
    },
    description: () => Math.random() > 0.7 ? 'Senior Lecturer' : null,
    sessions: () => new Array(Math.floor(Math.random() * 4) + 2) // 2-5 sessions
  }),
  Query: () => ({
    getResourceTimetables: () => new Array(Math.floor(Math.random() * 3) + 2) // 2-4 timetables
  })
};

// Create executable schema with mocks
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema, mocks });

// Apollo Client with mock schema
export const apolloClient = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
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