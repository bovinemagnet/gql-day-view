export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location?: string;
  category: 'meeting' | 'presentation' | 'review' | 'social' | 'planning';
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}