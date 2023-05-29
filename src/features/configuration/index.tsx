import ConfigurationContent from "./configurationContent";
import ManageConfigurationPage from "./configuration";

const ConfigurationPage = ({isUnsaved, setNavigatePath, setIsUnsaved, openConfirmBox, setOpenconfirmmBox, navigatePath}: any) => {
  return (
    <ConfigurationContent 
      navigatePath={navigatePath}
      setNavigatePath={setNavigatePath}
      isUnsaved={isUnsaved}
      setIsUnsaved={setIsUnsaved}
      openConfirmBox={openConfirmBox}
      setOpenconfirmmBox={setOpenconfirmmBox}
    />
  );
};
export default ConfigurationPage;

export { ManageConfigurationPage };
