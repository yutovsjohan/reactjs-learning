export class Task {
  _id?: string;
  title: string;
  startDate: Date;
  dueDate: Date;
  organization: string;
  priority: number; // HIGH / MEDIUM / LOW
  status: number; // Ready for dev, In-progress, Q/A, Done
  description: string;
  id?: string;

  constructor() {
    this._id = "";
    this.title = "";
    this.startDate = new Date();
    this.dueDate = new Date();
    this.organization = "";
    this.priority = 1;
    this.status = 1;
    this.description = "";
    this.id = this._id;
  }
}
