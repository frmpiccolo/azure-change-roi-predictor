export interface ProjectMonthlyData {
  id: number;
  month: number;
  year: number;
  monthlyBudget: number;
  monthlyPeopleImpacted: number;
  expectedResult: number;
  obtainedResult?: number;
  monthlyROI?: number;
  projectMonthlyInsights?: any;
}

export type CreateProjectMonthlyDataDto = Omit<
  ProjectMonthlyData,
  'id' | 'monthlyROI'
>;
export type UpdateProjectMonthlyDataDto = CreateProjectMonthlyDataDto & {
  id?: number;
};
