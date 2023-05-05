import { useEffect, useState } from "react";
import {
  getAllConfigurations,
  getModulesByConfigId,
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
      console.log(data);
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
