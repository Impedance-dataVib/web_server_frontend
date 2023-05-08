import formSchema from "../../../../../features/configuration/formSchema";
import { Grid } from "@mui/material";
import FormFieldConditionalRender from "./formFieldConditionalRender";

const AdvancedParameters = ({ handleFormData, formContext }: any) => {
  return (
    <Grid container spacing={1} sx={{ marginLeft: "64px", marginTop: "28px" }}>
      {formSchema["Engine"]["Advanced Parameters"].map((item: any) => (
        <Grid key={item.label} container item>
          <Grid item>
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={{ ...item, handleChange: handleFormData }}
              formContext={formContext}
            ></FormFieldConditionalRender>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default AdvancedParameters;
