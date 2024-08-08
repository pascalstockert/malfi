import { Injectable } from '@angular/core';
import { createClient, PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { InsertData, RowData, TableName } from './db.types';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabaseHost, environment.supabaseKey);
  }

  public async insertInto<T = RowData>(table: TableName, data: InsertData<T>): Promise<PostgrestSingleResponse<T[]>> {
    return this.supabaseClient
      .from(table)
      .insert(data)
      .select();
  }

  public async fetchAll<T = RowData>(table: TableName): Promise<PostgrestSingleResponse<T[]>> {
    return this.supabaseClient
      .from(table)
      .select();
  }

  public async fetchById<T = RowData>(table: TableName, id: string, column = 'id'): Promise<PostgrestSingleResponse<T[]>> {
    return this.supabaseClient
      .from(table)
      .select()
      .eq(column, id);
  }

  public async updateById<T = RowData>(table: TableName, id: string, values: Partial<T>, column = 'id'): Promise<PostgrestSingleResponse<T[]>> {
    return this.supabaseClient
      .from(table)
      .update(values)
      .eq(column, id)
      .select();
  }

  public async deleteById(table: TableName, id: string, column = 'id'): Promise<PostgrestSingleResponse<null>> {
    console.log(table, id);

    return this.supabaseClient
      .from(table)
      .delete()
      .eq(column, id);
  }
}
