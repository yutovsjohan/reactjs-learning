export interface Task {
  _id?: number;
  title: string;
  startDate: Date;
  dueDate: Date;
  organization: string;
  priority: number; // HIGH / MEDIUM / LOW
  status: number; // Ready for dev, In-progress, Q/A, Done
  description: string;

}
