import axios from "axios";
import api from "../../app/api";

const getModuleInfo = () => {
  return api.get("/module/get-all.php");
};

const postDownloadInfo = (payload: object) => {
  return api.post("/download/download-request.php", payload);
};

const getDownloadFile = (setProgressBar: any) => {
  return api.get("/download/file_download.php", {
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      setProgressBar(parseInt(((progressEvent.progress || 0)  * 100).toString()))
    }
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
