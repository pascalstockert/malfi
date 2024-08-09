import { PostgrestSingleResponse } from '@supabase/supabase-js';

export enum TableName {
  GOALS = 'goals',
  TASKS = 'tasks',
  INTENTIONS = 'intentions',
}

export type RowData<T = Goal | Task> = T;
export type InsertData<T = RowData> = Omit<T, 'id' | 'created_at'>

export interface BaseEntry {
  id: string;
  created_at: string;
  user_id: string;
}

export interface Goal extends BaseEntry {
  title: string;
  description?: string;
  deadline?: string;
}

export interface Task extends BaseEntry {
  goal: string;
  title: string;
  order: number;
  has_intention: boolean;
  completed: boolean;
}

export interface Intention extends BaseEntry {
  task: string;
  start: string;
  end: string;
  completed: boolean;
  notes?: string;
}
