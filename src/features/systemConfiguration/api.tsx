import api from "../../app/api";

const getSystemInfo = () => {
  return api.get("/system-information/get-all.php");
};

const updateSystemConfigFile = (payload: any) => {
  return api.post("/update/vbox-frimware-update.php", payload);
};

const SystemInfoApi = {
  getSystemInfo,
  updateSystemConfigFile,
};

export default SystemInfoApi;
