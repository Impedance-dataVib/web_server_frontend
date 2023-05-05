import api from "../../app/api";

const getModules = () => {
  return api.get("/module/get-all.php");
};

const DashboardApi = {
  getModules,
};

export default DashboardApi;
