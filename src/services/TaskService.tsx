import WixBaseService from "./WixBaseService";

class TaskService extends WixBaseService {
  getCollectionName(): string {
    return process.env.TASK_COLLECTION_NAME
      ? process.env.TASK_COLLECTION_NAME
      : "";
  }
  getAuthorization(): string {
    return process.env.TASK_COLLECTION_AUTHORIZATION
      ? process.env.TASK_COLLECTION_AUTHORIZATION
      : "";
  }
}

export default TaskService;
