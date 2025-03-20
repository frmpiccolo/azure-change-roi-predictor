export interface ProjectInsight {
  id: number;
  projectId: number;
  description: string;
}

export type CreateProjectInsightDto = Omit<ProjectInsight, 'id'>;
export type UpdateProjectInsightDto = { description: string };
