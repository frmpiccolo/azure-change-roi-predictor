import { CreateProjectMonthlyDataDto } from './CreateProjectMonthlyDataDto';
import { Project } from './Project';

export interface CreateProjectDto extends Omit<Project, 'id' | 'monthlyData'> {
  monthlyData?: CreateProjectMonthlyDataDto[];
}
