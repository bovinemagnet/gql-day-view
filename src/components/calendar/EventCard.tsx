import { CalendarEvent } from '@/types/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: CalendarEvent;
  isCurrentTime?: boolean;
}

const categoryColors = {
  meeting: 'bg-blue-100 text-blue-800 border-blue-200',
  presentation: 'bg-purple-100 text-purple-800 border-purple-200',
  review: 'bg-green-100 text-green-800 border-green-200',
  social: 'bg-orange-100 text-orange-800 border-orange-200',
  planning: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

export const EventCard = ({ event, isCurrentTime = false }: EventCardProps) => {
  return (
    <div
      className={cn(
        "bg-calendar-event-bg border-l-4 border-calendar-event-border rounded-lg p-4 shadow-calendar transition-all duration-200 hover:shadow-calendar-lg animate-slide-up",
        isCurrentTime && "ring-2 ring-calendar ring-opacity-50 bg-calendar-light"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {event.title}
          </h3>
          {event.description && (
            <p className="text-calendar-time-text text-sm mt-1 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={cn("ml-3 capitalize", categoryColors[event.category])}
        >
          {event.category}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-calendar-time-text text-sm">
          <Clock className="h-4 w-4 mr-2 text-calendar" />
          <span className="font-medium">
            {event.startTime} - {event.endTime}
          </span>
        </div>

        {event.location && (
          <div className="flex items-center text-calendar-time-text text-sm">
            <MapPin className="h-4 w-4 mr-2 text-calendar" />
            <span>{event.location}</span>
          </div>
        )}

        {event.attendees.length > 0 && (
          <div className="flex items-center text-calendar-time-text text-sm">
            <Users className="h-4 w-4 mr-2 text-calendar" />
            <span>
              {event.attendees.slice(0, 2).join(', ')}
              {event.attendees.length > 2 && ` +${event.attendees.length - 2} more`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};