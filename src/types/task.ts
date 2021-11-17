export interface Task {
    id: number;
    name: string;
    //經辦人
    processorId: number;
    projectId: number;
    //任務組
    epicId: number;
    kanbanId: number;
    //bug or task
    typeId: number;
    note: string;
  }