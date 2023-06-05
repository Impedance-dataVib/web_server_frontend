import api from "../../app/api";

const getModuleInfo = () => {
  return api.get("/module/get-all.php");
};

const postDownloadInfo = (payload: object) => {
  return api.post("/download/download-request.php", payload);
};

const getDownloadFile = () => {
  return api.get("/download/file_download.php", {
    responseType: "blob",
  });
};

const getNotification = () => {
  return api.get("/notification/get.php");
};

const DownloadInfoApi = {
  getModuleInfo,
  postDownloadInfo,
  getDownloadFile,
  getNotification,
};

export default DownloadInfoApi;
