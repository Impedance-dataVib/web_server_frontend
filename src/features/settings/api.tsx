import api from "../../app/api";

const getSettingsInfo = () => {
  return api.get("/setting/get-all.php");
};

const saveSettingsInfo = (payload: object) => {
  return api.post("/setting/save.php", payload);
};

const SettingsApi = {
  getSettingsInfo,
  saveSettingsInfo
};

export default SettingsApi;