import { TimeSlot } from '@/types/calendar';
import { EventCard } from './EventCard';
import { Separator } from '@/components/ui/separator';

interface EnhancedSlot extends TimeSlot {
  sessionName: string;
  sessionDescription?: string;
  sessionType: string;
  campus: string;
  staffName: string;
  timetableCode: string;
}

interface TimelineProps {
  slots: EnhancedSlot[];
}

export const Timeline = ({ slots }: TimelineProps) => {
  // Sort slots by start time
  const sortedSlots = [...slots].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const isCurrentTime = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Today's Schedule</h2>
        <Separator className="flex-1" />
      </div>

      {sortedSlots.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-calendar">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No sessions scheduled
          </h3>
          <p className="text-calendar-time-text">
            Enjoy your free day! Time to focus on deep work.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedSlots.map((slot, index) => (
            <div key={`${slot.timetableCode}-${index}`} className="relative">
              {index > 0 && (
                <div className="absolute left-0 top-0 w-1 h-4 bg-gradient-to-b from-calendar to-calendar-secondary transform -translate-y-4" />
              )}
              <EventCard 
                slot={slot} 
                isCurrentTime={isCurrentTime(slot.startTime, slot.endTime)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};