import ConfigurationContent from "./configurationContent";
import ManageConfigurationPage from "./configuration";

const ConfigurationPage = ({isUnsaved, setIsUnsaved, openConfirmBox, setOpenconfirmmBox, navigatePath}: any) => {
  return (
    <ConfigurationContent navigatePath={navigatePath} isUnsaved={isUnsaved} setIsUnsaved={setIsUnsaved} openConfirmBox={openConfirmBox} setOpenconfirmmBox={setOpenconfirmmBox}></ConfigurationContent>
  );
};
export default ConfigurationPage;

export { ManageConfigurationPage };
