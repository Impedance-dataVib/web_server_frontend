import ContentBox from "../../app/components/content-box";
import ConfigurationContent from "./configurationContent";
import ManageConfigurationPage from "./configuration";

const ConfigurationPage = () => {
  return (
    <ContentBox title="Configuration">
      <ConfigurationContent></ConfigurationContent>
    </ContentBox>
  );
};
export default ConfigurationPage;

export { ManageConfigurationPage };
