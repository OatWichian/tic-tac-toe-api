import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EHttpMethod } from './req-api.enum';
import { IReqApiResponse } from './req-api.interface';

@Injectable()
export class ReqApiService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly httpService: HttpService) {}

  async get(reqFunction: string, url: string, option?: AxiosRequestConfig): Promise<IReqApiResponse> {
    const startTime = new Date().getTime();
    try {
      const response = await this.httpService.axiosRef.get(url, { ...option });

      const reqTime = new Date().getTime() - startTime;
      return this.successHandler(response, EHttpMethod.GET, reqFunction, url, option, null, reqTime);
    } catch (error) {
      const reqTime = new Date().getTime() - startTime;
      return this.errorHandler(error, EHttpMethod.GET, reqFunction, url, option, null, reqTime);
    }
  }

  async post(reqFunction: string, url: string, body: unknown, option?: AxiosRequestConfig): Promise<IReqApiResponse> {
    const startTime = new Date().getTime();

    try {
      const response = await this.httpService.axiosRef.post(url, body, {
        ...option,
      });

      const reqTime = new Date().getTime() - startTime;
      return this.successHandler(response, EHttpMethod.POST, reqFunction, url, option, body, reqTime);
    } catch (error) {
      const reqTime = new Date().getTime() - startTime;
      throw this.errorHandler(error, EHttpMethod.POST, reqFunction, url, option, body, reqTime);
    }
  }

  async put(reqFunction: string, url: string, body: unknown, option?: AxiosRequestConfig): Promise<IReqApiResponse> {
    const startTime = new Date().getTime();

    try {
      const response = await this.httpService.axiosRef.put(url, body, {
        ...option,
      });

      const reqTime = new Date().getTime() - startTime;
      return this.successHandler(response, EHttpMethod.PUT, reqFunction, url, option, body, reqTime);
    } catch (error) {
      const reqTime = new Date().getTime() - startTime;
      throw this.errorHandler(error, EHttpMethod.PUT, reqFunction, url, option, body, reqTime);
    }
  }

  async delete(reqFunction: string, url: string, option?: AxiosRequestConfig): Promise<IReqApiResponse> {
    const startTime = new Date().getTime();

    try {
      const response = await this.httpService.axiosRef.delete(url, {
        ...option,
      });

      const reqTime = new Date().getTime() - startTime;
      return this.successHandler(response, EHttpMethod.DELETE, reqFunction, url, option, null, reqTime);
    } catch (error) {
      const reqTime = new Date().getTime() - startTime;
      throw this.errorHandler(error, EHttpMethod.DELETE, reqFunction, url, option, null, reqTime);
    }
  }

  private async successHandler(
    response: AxiosResponse,
    method: EHttpMethod,
    reqFunction: string,
    url: string,
    option: AxiosRequestConfig,
    body: unknown,
    reqTime = 0,
  ): Promise<IReqApiResponse> {
    this.logger.log(`### ${method} Request ${reqFunction} url: ${url} - time: ${reqTime} ms`);

    new URL(url);
    return {
      success: true,
      data: response.data || null,
      headers: response.headers || null,
      status: response.status,
    };
  }

  private async errorHandler(
    error: AxiosError,
    method: EHttpMethod,
    reqFunction: string,
    url: string,
    option: AxiosRequestConfig,
    body: unknown,
    reqTime = 0,
  ): Promise<IReqApiResponse> {
    this.logger.error(`### Error ${method} Request ${reqFunction} url: ${url} - time: ${reqTime} ms`);

    new URL(url);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        data: error.response.data,
        error: error.message,
        headers: error.response.headers || null,
      };
    } else {
      return {
        success: false,
        status: 999,
        data: null,
        error: error.message,
        headers: null,
      };
    }
  }
}
