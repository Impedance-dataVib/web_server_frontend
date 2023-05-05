import api from "../../app/api";

const getSystemInfo = () => {
  return api.get("/system-information/get-all.php");
};

const SystemInfoApi = {
  getSystemInfo,
};

export default SystemInfoApi;