import formSchema from "../../../../../features/configuration/formSchema";
import { Container, Grid } from "@mui/material";
import FormFieldConditionalRender from "./formFieldConditionalRender";
import { useAuth } from "../../../../../app/auth";
const AdvancedParameters = ({ handleFormData, formContext }: any) => {
  const { userName } = useAuth();
  return (
    <Grid container spacing={1}>
      <Container sx={{ color: "grey" }}>
        *Advance Parameter Can Be Change By Admin Only
      </Container>
      {formSchema["Engine"]["Advanced Parameters"].map((item: any) => (
        <Grid key={item.label} container item>
          <Grid item>
            <FormFieldConditionalRender
              type={item.type}
              fieldProps={{
                ...item,
                handleChange: handleFormData,
                userName: userName,
              }}
              formContext={formContext}
            ></FormFieldConditionalRender>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default AdvancedParameters;
