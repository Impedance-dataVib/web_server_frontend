import api from "../../app/api";

const getModules = async () => {
  try {
    const configResponse = await api.get("configuration/get-all.php");
    if (
      configResponse !== undefined &&
      configResponse.data !== undefined &&
      configResponse.data?.data !== undefined &&
      Array.isArray(configResponse.data?.data) &&
      configResponse.data?.data?.length > 0
    ) {
      const configs: any[] = configResponse.data?.data;

      const activeConfig = configs?.find(
        (c) => String(c.status)?.toLowerCase() === "active"
      );
      if (activeConfig !== undefined && activeConfig?.id !== undefined) {
        return await api.get(
          `module/get-modules-by-config-Id.php/${activeConfig?.id}`
        );
      }
    }
    return Promise.reject("Cannot get the modules");
  } catch (e) {
    return Promise.reject("Cannot get the modules");
  }
};

const DashboardApi = {
  getModules,
};

export default DashboardApi;
