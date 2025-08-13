import { useQuery } from '@apollo/client';
import { GET_TODAYS_EVENTS } from '@/lib/graphql/client';
import { CalendarEvent } from '@/types/calendar';
import { CalendarHeader } from './CalendarHeader';
import { Timeline } from './Timeline';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CalendarView = () => {
  const { data, loading, error, refetch } = useQuery(GET_TODAYS_EVENTS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  const today = new Date();
  const events: CalendarEvent[] = data?.getTodaysEvents || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-calendar-gradient p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-calendar-gradient p-6">
        <div className="max-w-4xl mx-auto">
          <Alert className="border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load calendar events: {error.message}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                className="ml-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-calendar-gradient">
      <div className="max-w-4xl mx-auto p-6">
        <CalendarHeader date={today} eventsCount={events.length} />
        <Timeline events={events} />
      </div>
    </div>
  );
};