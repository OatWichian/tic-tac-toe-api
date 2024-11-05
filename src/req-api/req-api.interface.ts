import { RawAxiosResponseHeaders } from 'axios';

export interface IReqApiResponse {
  success: boolean;
  data: any;
  error?: string;
  headers: RawAxiosResponseHeaders;
  status: number;
}
