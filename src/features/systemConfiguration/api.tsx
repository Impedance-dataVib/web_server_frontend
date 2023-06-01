import api from "../../app/api";

const getSystemInfo = () => {
  return api.get("/system-information/get-all.php");
};

const updateSystemConfigFile = (payload1: any, payload2: any) => {
  return api.post("/update/vbox-frimware-update.php", payload1, payload2);
};

const SystemInfoApi = {
  getSystemInfo,
  updateSystemConfigFile,
};

export default SystemInfoApi;
