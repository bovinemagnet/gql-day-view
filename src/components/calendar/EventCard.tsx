import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface EnhancedSlot {
  startTime: string;
  endTime: string;
  duration: number;
  dayOfWeek: string;
  timeZone?: string;
  sessionName: string;
  sessionDescription?: string;
  sessionType: string;
  campus: string;
  staffName: string;
  timetableCode: string;
}

interface EventCardProps {
  slot: EnhancedSlot;
  isCurrentTime?: boolean;
}

const sessionTypeColors = {
  Lecture: 'bg-blue-100 text-blue-800 border-blue-200',
  Tutorial: 'bg-purple-100 text-purple-800 border-purple-200',
  Lab: 'bg-green-100 text-green-800 border-green-200',
  Workshop: 'bg-orange-100 text-orange-800 border-orange-200',
  Seminar: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

export const EventCard = ({ slot, isCurrentTime = false }: EventCardProps) => {
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
            {slot.sessionName} - {slot.sessionType}
          </h3>
          {slot.sessionDescription && (
            <p className="text-calendar-time-text text-sm mt-1 line-clamp-2">
              {slot.sessionDescription}
            </p>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={cn("ml-3 capitalize", sessionTypeColors[slot.sessionType as keyof typeof sessionTypeColors] || 'bg-gray-100 text-gray-800 border-gray-200')}
        >
          {slot.sessionType}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-calendar-time-text text-sm">
          <Clock className="h-4 w-4 mr-2 text-calendar" />
          <span className="font-medium">
            {format(new Date(slot.startTime), 'HH:mm')} - {format(new Date(slot.endTime), 'HH:mm')}
            <span className="ml-2 text-xs opacity-75">({slot.duration} min)</span>
          </span>
        </div>

        <div className="flex items-center text-calendar-time-text text-sm">
          <MapPin className="h-4 w-4 mr-2 text-calendar" />
          <span>{slot.campus}</span>
        </div>

        <div className="flex items-center text-calendar-time-text text-sm">
          <User className="h-4 w-4 mr-2 text-calendar" />
          <span>{slot.staffName} ({slot.timetableCode})</span>
        </div>

        {slot.timeZone && (
          <div className="flex items-center text-calendar-time-text text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-calendar" />
            <span className="text-xs opacity-75">{slot.timeZone}</span>
          </div>
        )}
      </div>
    </div>
  );
};