import api from "./app/api";

const getLicenseInfo = () => {
  return api.get("/license/get-license.php");
};

const importLicense = () => {
  return api.post('/license/import-license.php', {
    
  })
}

const CommonApi = {
  getLicenseInfo,
};
export default CommonApi;
