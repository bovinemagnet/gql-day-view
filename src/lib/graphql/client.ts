import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';

// GraphQL schema definition
const typeDefs = gql`
  type CalendarEvent {
    id: ID!
    title: String!
    description: String
    startTime: String!
    endTime: String!
    attendees: [String!]!
    location: String
    category: String!
  }

  type Query {
    getTodaysEvents: [CalendarEvent!]!
  }
`;

// Mock resolvers for demonstration
const mocks = {
  CalendarEvent: () => ({
    id: () => Math.random().toString(36).substr(2, 9),
    title: () => {
      const titles = [
        'Team Standup',
        'Client Presentation',
        'Design Review',
        'Lunch Meeting',
        'Code Review',
        'Planning Session',
        'One-on-One',
        'Sprint Review',
        'Product Demo',
        'Strategy Call'
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    },
    description: () => {
      const descriptions = [
        'Weekly team sync to discuss progress and blockers',
        'Present the latest design concepts to stakeholders',
        'Review UI/UX designs for the new feature',
        'Informal discussion over lunch',
        'Review code changes and ensure quality',
        'Plan upcoming sprint activities',
        'Personal development and feedback session',
        'Demo completed features to the team',
        'Showcase product to potential clients',
        'Discuss long-term strategy and roadmap'
      ];
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    },
    startTime: () => {
      const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const minutes = Math.random() > 0.5 ? '00' : '30';
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    },
    endTime: () => {
      const hours = Math.floor(Math.random() * 12) + 9; // 9 AM to 9 PM
      const minutes = Math.random() > 0.5 ? '00' : '30';
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    },
    attendees: () => {
      const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Johnson', 'Charlie Brown'];
      const count = Math.floor(Math.random() * 4) + 1;
      return names.slice(0, count);
    },
    location: () => {
      const locations = [
        'Conference Room A',
        'Zoom Meeting',
        'Office Lobby',
        'Meeting Room 2',
        'Virtual',
        'Cafeteria',
        'Main Office'
      ];
      return locations[Math.floor(Math.random() * locations.length)];
    },
    category: () => {
      const categories = ['meeting', 'presentation', 'review', 'social', 'planning'];
      return categories[Math.floor(Math.random() * categories.length)];
    }
  }),
  Query: () => ({
    getTodaysEvents: () => new Array(Math.floor(Math.random() * 6) + 3) // 3-8 events
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
export const GET_TODAYS_EVENTS = gql`
  query GetTodaysEvents {
    getTodaysEvents {
      id
      title
      description
      startTime
      endTime
      attendees
      location
      category
    }
  }
`;