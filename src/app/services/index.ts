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

export const importConfiguration = (
  data: any
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post("/configuration/import-configuration.php", data);
};

export const exportConfiguration = (
  id: any
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.get("/configuration/export-configuration.php/" + id);
};

export const addConfiguration = (
  data: any
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

export const getModuleById = (id: string) => {
  return axiosInstance.get(`/module/get-by-Id.php/${id}`);
};

export const deleteModule = (id: string) => {
  return axiosInstance.delete(`/module/delete.php/${id}`);
};

export const getSystemInfo = () => {
  return axiosInstance.get("/system-information/get-all.php");
};

export const getLicenseInfo = () => {
  return axiosInstance.get("/license/get-license.php");
};

export const getChannelByNameAndConfigID = (
  configId: string,
  channelName: string
) => {
  return axiosInstance.post(
    "/configuration/get-channel-by-name-and-config-id.php",
    { name: channelName, configId: configId }
  );
};

export const getAllTrendsService = (id: string) => {
  return axiosInstance.get(`/dashboard/trends.php/${id}`);
};

export const getAllTrendsData = (payload: any) => {
  return axiosInstance.post(`/trend/get-all.php`, payload);
};

export const getModules = () => {
  return axiosInstance.get("/module/get-all.php");
};
