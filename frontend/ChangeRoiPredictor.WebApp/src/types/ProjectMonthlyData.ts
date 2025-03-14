export interface ProjectMonthlyData {
  id: number;
  projectId: number;
  month: number;
  year: number;
  monthlyBudget: number;
  monthlyPeopleImpacted: number;
  expectedResult: number;
  obtainedResult: number;
}
