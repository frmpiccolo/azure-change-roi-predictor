import axios from 'axios';
import { Project } from '../types/Project';
import { CreateProjectDto } from '../types/CreateProjectDto';
import { UpdateProjectDto } from '../types/UpdateProjectDto';
import { ProjectMonthlyData } from '../types/ProjectMonthlyData';
import { CreateProjectMonthlyDataDto } from '../types/CreateProjectMonthlyDataDto';
import { UpdateProjectMonthlyDataDto } from '../types/UpdateProjectMonthlyDataDto';

const baseUrl = process.env.REACT_APP_API_URL;

export const getProjects = async (): Promise<Project[]> =>
  (await axios.get(`${baseUrl}/project`)).data;

export const getProjectById = async (id: number): Promise<Project> =>
  (await axios.get(`${baseUrl}/project/${id}`)).data;

export const createProject = (data: CreateProjectDto) =>
  axios.post<Project>(`${baseUrl}/project`, data);

export const updateProject = (id: number, data: UpdateProjectDto) =>
  axios.put<Project>(`${baseUrl}/project/${id}`, data);

export const deleteProject = (id: number) =>
  axios.delete(`${baseUrl}/project/${id}`);

export const getMonthlyDataByProjectId = async (
  projectId: number
): Promise<ProjectMonthlyData[]> =>
  (await axios.get(`${baseUrl}/project/${projectId}/monthly-data`)).data;

export const createMonthlyData = (
  projectId: number,
  data: CreateProjectMonthlyDataDto
) =>
  axios.post<ProjectMonthlyData>(
    `${baseUrl}/project/${projectId}/monthly-data`,
    data
  );

export const updateMonthlyData = (
  projectId: number,
  dataId: number,
  data: UpdateProjectMonthlyDataDto
) =>
  axios.put<ProjectMonthlyData>(
    `${baseUrl}/project/${projectId}/monthly-data/${dataId}`,
    data
  );

export const deleteMonthlyData = (projectId: number, dataId: number) =>
  axios.delete(`${baseUrl}/project/${projectId}/monthly-data/${dataId}`);

export const getProjectInsights = (projectId: number) =>
  axios.get(`${baseUrl}/project/${projectId}/insights`);

export const getMonthlyInsights = (
  projectId: number,
  month: number,
  year: number
) =>
  axios.get(
    `${baseUrl}/project/${projectId}/monthly-insights?month=${month}&year=${year}`
  );
