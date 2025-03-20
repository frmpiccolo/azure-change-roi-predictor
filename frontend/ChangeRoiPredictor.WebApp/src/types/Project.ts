export interface Project {
  id: number;
  name: string;
  description?: string;
  durationInMonths: number;
  startDate: string;
  endDate: string;
  totalBudget: number;
  numberOfPeopleAffected: number;
  complexityRating?: number;
  engagementScore?: number;
  riskLevel?: number;
  readinessLevel?: number;
  methodology?: string;
}

export type CreateProjectDto = Omit<Project, 'id'>;
export type UpdateProjectDto = CreateProjectDto;
