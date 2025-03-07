import { Types } from "mongoose";

export interface ICreateEvent {
  name: string;
  description: string;
  date: Date;
}

export interface IUpdateEvent {
  name?: string;
  description?: string;
  date?: Date;
}

export interface IQueryEvent {
  start_date?: string;
  end_date?: string;
}
