import axios from 'axios';
import { Project, CreateProjectDto, UpdateProjectDto } from '../types/Project';
import {
  ProjectMonthlyData,
  CreateProjectMonthlyDataDto,
  UpdateProjectMonthlyDataDto,
} from '../types/ProjectMonthlyData';
import {
  ProjectInsight,
  CreateProjectInsightDto,
  UpdateProjectInsightDto,
} from '../types/ProjectInsight';
import {
  ProjectMonthlyInsight,
  CreateProjectMonthlyInsightDto,
  UpdateProjectMonthlyInsightDto,
} from '../types/ProjectMonthlyInsight';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const getProjects = () =>
  api.get<Project[]>('/project').then((r) => r.data);
export const getProjectById = (id: number) =>
  api.get<Project>(`/project/${id}`).then((r) => r.data);
export const createProject = (data: CreateProjectDto) =>
  api.post<Project>('/project', data).then((r) => r.data);
export const updateProject = (id: number, data: UpdateProjectDto) =>
  api.put<Project>(`/project/${id}`, data).then((r) => r.data);
export const deleteProject = (id: number) => api.delete(`/project/${id}`);

export const getMonthlyDataByProjectId = (projectId: number) =>
  api
    .get<ProjectMonthlyData[]>(`/ProjectMonthlyData/project/${projectId}`)
    .then((r) => r.data);
export const createMonthlyData = (
  projectId: number,
  data: CreateProjectMonthlyDataDto
) =>
  api
    .post<ProjectMonthlyData>(`/ProjectMonthlyData/project/${projectId}`, data)
    .then((r) => r.data);
export const updateMonthlyData = (
  id: number,
  data: UpdateProjectMonthlyDataDto
) =>
  api
    .put<ProjectMonthlyData>(`/ProjectMonthlyData/${id}`, data)
    .then((r) => r.data);
export const deleteMonthlyData = (id: number) =>
  api.delete(`/ProjectMonthlyData/${id}`);

export const getProjectInsights = (projectId: number) =>
  api
    .get<ProjectInsight[]>(`/ProjectInsight/project/${projectId}`)
    .then((r) => r.data);
export const createProjectInsight = (data: CreateProjectInsightDto) =>
  api.post<ProjectInsight>('/ProjectInsight', data).then((r) => r.data);
export const updateProjectInsight = (
  id: number,
  data: UpdateProjectInsightDto
) => api.put<ProjectInsight>(`/ProjectInsight/${id}`, data).then((r) => r.data);
export const deleteProjectInsight = (id: number) =>
  api.delete(`/ProjectInsight/${id}`);

export const getMonthlyInsights = (monthlyDataId: number) =>
  api
    .get<
      ProjectMonthlyInsight[]
    >(`/ProjectMonthlyInsight/monthly/${monthlyDataId}`)
    .then((r) => r.data);
export const createMonthlyInsight = (data: CreateProjectMonthlyInsightDto) =>
  api
    .post<ProjectMonthlyInsight>('/ProjectMonthlyInsight', data)
    .then((r) => r.data);
export const updateMonthlyInsight = (
  id: number,
  data: UpdateProjectMonthlyInsightDto
) =>
  api
    .put<ProjectMonthlyInsight>(`/ProjectMonthlyInsight/${id}`, data)
    .then((r) => r.data);
export const deleteMonthlyInsight = (id: number) =>
  api.delete(`/ProjectMonthlyInsight/${id}`);

export const getMonthlyInsightById = (id: number) =>
  api
    .get<ProjectMonthlyInsight>(`/ProjectMonthlyInsight/${id}`)
    .then((r) => r.data);

// Project Insight por ID
export const getProjectInsightById = (id: number) =>
  api.get<ProjectInsight>(`/ProjectInsight/${id}`).then((r) => r.data);

// Monthly Data por ProjectId (renomeado corretamente)
export const getMonthlyDataByProject = (projectId: number) =>
  api
    .get<ProjectMonthlyData[]>(`/ProjectMonthlyData/project/${projectId}`)
    .then((r) => r.data);
