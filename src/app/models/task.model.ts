export interface Task {
    taskID: number;
    taskName: string;
    taskDescription: string;
    isFinished: boolean;
    creationTime: string; // Hoặc Date nếu cần định dạng thời gian
    finishedTime?: string | null;
  }
  