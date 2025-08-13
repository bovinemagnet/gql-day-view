import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface CalendarHeaderProps {
  date: Date;
  eventsCount: number;
}

export const CalendarHeader = ({ date, eventsCount }: CalendarHeaderProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-calendar mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-calendar-light rounded-xl">
            <Calendar className="h-8 w-8 text-calendar" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {format(date, 'EEEE, MMMM d')}
            </h1>
            <p className="text-calendar-time-text text-lg">
              {format(date, 'yyyy')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-calendar-time-text">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">
              {eventsCount} {eventsCount === 1 ? 'event' : 'events'} today
            </span>
          </div>
          <div className="text-2xl font-bold text-calendar mt-1">
            {format(new Date(), 'HH:mm')}
          </div>
        </div>
      </div>
    </div>
  );
};