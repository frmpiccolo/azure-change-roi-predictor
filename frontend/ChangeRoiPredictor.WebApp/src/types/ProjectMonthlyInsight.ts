export interface ProjectMonthlyInsight {
  id: number;
  projectMonthlyDataId: number;
  description: string;
}

export type CreateProjectMonthlyInsightDto = Omit<ProjectMonthlyInsight, 'id'>;
export type UpdateProjectMonthlyInsightDto = { description: string };
