import api from "../../app/api";

const getModuleInfo = () => {
  return api.get("/module/get-all.php");
};

const postDownloadInfo = (payload: object) => {
  return api.post("/download/download-request.php", payload);
};

const DownloadInfoApi = {
  getModuleInfo,
  postDownloadInfo,
};

export default DownloadInfoApi;
