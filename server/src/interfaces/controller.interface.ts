import { ObjectId } from "mongoose";

export interface GoogleStringAuth {
  email: string;
  name: string;
  picture: string;
}

export interface Plan {
  _id: ObjectId;
  mentor_id: ObjectId;
  planDetails: planDetails[];
  planLimit: number;
  createdAt: string;
}

interface planDetails {
  _id: string;
  mentor_id: string;
  planAmount: number;
  planType: string;
  planDescription: string;
  isDeleted: boolean;
  planServices: Services[];
}

export interface SinglePlan {
  _id: string;
  planDetails: planDetails[];
}

interface Services {
  _id: string;
  serviceName: string;
  serviceCount: number | null;
}
