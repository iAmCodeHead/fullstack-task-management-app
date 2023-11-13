import { Model, Document } from 'mongoose';
import { QueryResult } from '../../utils/db-utils/pagination';

export interface IUser {
  username: string;
  password: string;
  name: string;
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUserDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
