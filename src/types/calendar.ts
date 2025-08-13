export interface TimeSlot {
  startTime: string;
  endTime: string;
  duration: number;
  dayOfWeek: string;
  timeZone?: string;
}

export interface Session {
  id: string;
  name: string;
  description?: string;
  sessionType: string;
  campus: string;
  slots: TimeSlot[];
}

export interface ResourceTimetable {
  timetableType: string;
  code: string;
  name: string;
  description?: string;
  sessions: Session[];
}

export interface TimetableData {
  getResourceTimetables: ResourceTimetable[];
}