import api from "../../app/api";

const getSystemInfo = () => {
  return api.get("/system-information/get-all.php");
};

const updateSystemConfigFile = (payload: object) => {
  return api.post("", payload);
};

const SystemInfoApi = {
  getSystemInfo,
  updateSystemConfigFile,
};

export default SystemInfoApi;
