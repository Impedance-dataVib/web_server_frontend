import api from "../../app/api";

const getSystemInfo = () => {
  return api.get("/system-information/get-all.php");
};

const updateSystemSoftwareFile = (payload: any) => {
  return api.post("/update/vbox-frimware-update.php", payload);
};
const updateSystemLicenseFile = (payload: any) => {
  return api.post("/license/import-license.php", payload);
};
const getFirmwareDetails = (payload: any) => {
  return api.post("/update/firmware-details.php", payload);
};
const SystemInfoApi = {
  getSystemInfo,
  updateSystemSoftwareFile,
  updateSystemLicenseFile,
  getFirmwareDetails,
};

export default SystemInfoApi;
