import api from "../../app/api";

const getModules = async () => {
  try {
    const configResponse = await api.get("module/get-all.php");
    if (
      configResponse !== undefined &&
      configResponse.data !== undefined
    ) {
      return configResponse.data?.data;
    }
    return Promise.reject("Cannot get the modules");
  } catch (e) {
    return Promise.reject("Cannot get the modules");
  }
};

const getTrendsData = async (moduleId: number) => {
  try {
    const configResponse = await api.get(`/dashboard/trends.php/${moduleId}`);
    if (
      configResponse !== undefined &&
      configResponse.data
    ) {
      const configs: any[] = configResponse.data;
      return configResponse.data;

    }
    return Promise.reject("Cannot get the modules");
  } catch (e) {
    return Promise.reject("Cannot get the modules");
  }
};

const DashboardApi = {
  getModules,
  getTrendsData,
};

export default DashboardApi;
