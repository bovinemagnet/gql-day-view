import { CalendarEvent } from '@/types/calendar';
import { EventCard } from './EventCard';
import { Separator } from '@/components/ui/separator';

interface TimelineProps {
  events: CalendarEvent[];
}

export const Timeline = ({ events }: TimelineProps) => {
  // Sort events by start time
  const sortedEvents = [...events].sort((a, b) => 
    a.startTime.localeCompare(b.startTime)
  );

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const isCurrentTime = (startTime: string, endTime: string) => {
    const current = getCurrentTime();
    return current >= startTime && current <= endTime;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Today's Schedule</h2>
        <Separator className="flex-1" />
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-calendar">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No events scheduled
          </h3>
          <p className="text-calendar-time-text">
            Enjoy your free day! Time to focus on deep work.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {index > 0 && (
                <div className="absolute left-0 top-0 w-1 h-4 bg-gradient-to-b from-calendar to-calendar-secondary transform -translate-y-4" />
              )}
              <EventCard 
                event={event} 
                isCurrentTime={isCurrentTime(event.startTime, event.endTime)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};