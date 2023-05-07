import { Grid, Typography } from "@mui/material";
import formSchema from "../../../../../features/configuration/formSchema";
import FormFieldConditionalRender from "./formFieldConditionalRender";

const EngineDetailsForm = ({ handleFormData, formContext }: any) => {
  return (
    <Grid container spacing={1} >
      {formSchema["Engine"]["Engine Details"].map((item: any) => (
        <Grid key={item.label} container item>
          <Grid item>
            <Typography
              component={"label"}
              sx={{
                width: "143px",
                display: "inline-block",
                fontSize: "16px",
                marginRight: "41px",
                marginBottom: "5px",
                alignItems: "right",
              }}
            >
              {item.name}
            </Typography>
          </Grid>
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
export default EngineDetailsForm;
