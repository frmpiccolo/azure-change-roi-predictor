export interface CreateProjectMonthlyDataDto {
  projectId: number;
  month: number;
  year: number;
  monthlyBudget: number;
  monthlyPeopleImpacted: number;
  expectedResult: number;
  obtainedResult: number;
}
