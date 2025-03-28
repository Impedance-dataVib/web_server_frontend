import { useContext } from "react";
import { Box, Paper } from "@mui/material";
import ReportComponent from "../../../../../app/components/report";
import DashboardContext from "../../../context";
import { useTranslation } from "react-i18next";

const EngineLatestReport = () => {
  const { engineLatestReport } = useContext(DashboardContext);

  const { t } = useTranslation("engine");

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Box sx={{ fontWeight: "bold" }}>
          {t("latestReportHeading", { ns: "engine" })}
        </Box>
        <Box>
          <ReportComponent reportData={engineLatestReport} />
        </Box>
      </Box>
    </Paper>
  );
};
export default EngineLatestReport;
