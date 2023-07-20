import { useEffect, useState } from "react";
import {
  getAllConfigurations,
  getModulesByConfigId,
  getModuleById,
  getSystemInfo,
  getLicenseInfo,
  getChannelByNameAndConfigID,
} from "../../../app/services";
export const useGetConfiguration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const getConfigData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getAllConfigurations();
      setData(data.data);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getConfigData();
  }, []);
  return { isLoading, data, isError, getConfigData };
};

export const useGetConfigurationModuleByConfigId = (id: string | undefined) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const getAllModulesByConfigId = async (id: string | undefined) => {
    try {
      setIsPending(true);
      const { data } = await getModulesByConfigId(id);
      setData(data.data);
      setIsPending(false);
    } catch (e) {
      setIsError(true);
      setData([]);
      setIsPending(false);
    }
  };
  useEffect(() => {
    getAllModulesByConfigId(id);
  }, [id]);
  return { isPending, data, isError, getAllModulesByConfigId };
};

export const useGetModuleById = (
  id: string
): {
  isLoading: boolean;
  data: any;
  isError: boolean;
  getModuleDataById: any;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const getModuleDataById = async (id: string) => {
    try {
      setIsLoading(true);
      const { data } = await getModuleById(id);
      setData(data.data);
      setIsLoading(false);
      setIsError(false);
    } catch (e) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getModuleDataById(id);
  }, [id]);
  return { isLoading, data, isError, getModuleDataById };
};

export const useGetSystemCustomerNameInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const getSystemCustomerName = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSystemInfo();
      setData(data.licenseInfo.client_name);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setData("");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSystemCustomerName();
  }, []);
  return { isLoading, data, isError, getSystemCustomerName };
};

export const useGetActiveConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<number | undefined>();
  const [isError, setIsError] = useState(false);
  const getActiveConfig = async () => {
    try {
      setIsLoading(true);
      const { data } = await getLicenseInfo();
      setData(data.configCount);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setData(undefined);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getActiveConfig();
  }, []);
  return { isLoading, data, isError, getActiveConfig };
};

export const useGetChannelByConfigIdName = (
  id: string,
  name: string,
  isDirty: boolean
) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<any>();
  const [isError, setIsError] = useState(false);
  const getChannelByConfigIdName = async (id: string, name: string) => {
    try {
      setIsPending(true);
      const { data } = await getChannelByNameAndConfigID(id, name);
      setData(data.data);
      setIsPending(false);
    } catch (e) {
      setIsError(true);
      setData(undefined);
      setIsPending(false);
    }
  };
  useEffect(() => {
    if (isDirty) {
      getChannelByConfigIdName(id, name);
    }
  }, [id, name]);
  return { isPending, data, isError, getChannelByConfigIdName };
};
