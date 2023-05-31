import React, { useEffect, useState } from "react";
import { getAllTrendsService, getModules } from "../../app/services";

export const useGetAllTrends = (id: []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const promiseObject = id.map((id) => getAllTrendsService(id));
  const getAllTrends = async () => {
    try {
      setIsLoading(true);
      const result = await Promise.all(promiseObject);
      console.log(result);
      const trendsData = result.map(({ data }) => data.trends);
      setData(trendsData);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id.length > 0) {
      getAllTrends();
    }
  }, [id.length]);
  return { isLoading, data, isError, getAllTrends };
};

export const useGetAllModules = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const getAllModules = async () => {
    try {
      setIsLoading(true);
      const { data } = await getModules();

      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllModules();
  }, []);
  return { isLoading, data, isError, getAllModules };
};
