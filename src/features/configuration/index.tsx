import Box from "@mui/material/Box";
import ContentBox from "../../app/components/content-box";
import ConfigurationContent from "./configurationContent";
import ManageConfigurationPage from "./configuration";

const ConfigurationPage = () => {
  return (
    <Box>
      <ContentBox title="Configuration">
        <ConfigurationContent></ConfigurationContent>
      </ContentBox>
    </Box>
  );
};
export default ConfigurationPage;

export { ManageConfigurationPage };
