import api from "./app/api";

const getLicenseInfo = () => {
  return api.get("/license/get-license.php");
};

const importLicense = (payload: any) => {
  if (!payload) {
    return Promise.reject("payload is required");
  }
  let formData = new FormData();
  formData.append("file", payload?.selectedFile);

  return api.post("/license/import-license.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const CommonApi = {
  getLicenseInfo,
  importLicense,
};
export default CommonApi;
