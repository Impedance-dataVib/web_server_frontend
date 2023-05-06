import axiosInstance from "../api";
import { AxiosResponse } from "axios";

export interface AddConfiguration {
  name: string;
}

export interface CreateConfigModule {
  setting_name: string;
  setting_value: string;
  status: "Active" | "Inactive";
  configuration_id: string;
}

export const getAllConfigurations = (): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.get("/configuration/get-all.php");
};

export const addConfiguration = (
  data: AddConfiguration
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post("/configuration/save.php", data);
};

export const getConfigModuleByConfigId = (
  id: string
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.get(
    `/configuration-module/get-modules-by-config-Id.php/${id}`
  );
};

export const getConfigModuleByModuleId = (
  id: string
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.get(`/configuration-module/get-by-Id.php/${id}`);
};

export const createConfigModule = (
  data: CreateConfigModule
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post("/configuration-module/save.php", data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const updateConfigModule = (
  data: any
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`/configuration-module/update.php`, data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const deleteConfig = (id: string): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.get(`/configuration/delete.php/${id}`);
};

export const AddModule = (data: any): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post("/module/save.php", data);
};

export const activeConfig = (data: any) => {
  return axiosInstance.post("/configuration/activate.php", data);
};

export const getModulesByConfigId = (id: string | undefined) => {
  return axiosInstance.get(`/module/get-modules-by-config-Id.php/${id}`);
};

export const saveModuleData = (data: any) => {
  return axiosInstance.post("/module/update.php", data);
};
