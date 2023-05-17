import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";

const FormFieldConditionalRender = ({ type, fieldProps, formContext }: any) => {
  switch (type) {
    case "dropdown":
      return (
        <FormControl
          sx={{ minWidth: "182px" }}
          error={Boolean(formContext?.errors?.[fieldProps.label])}
        >
          <InputLabel id={`${fieldProps.label}-label`}>
            {fieldProps.name}
          </InputLabel>
          <Select
            labelId={`${fieldProps.label}-label`}
            name={fieldProps.label}
            onChange={formContext?.handleChange}
            value={formContext?.values?.[fieldProps.label]}
            label={fieldProps.name}
          >
            {fieldProps.options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {Boolean(formContext?.errors?.[fieldProps.label]) && (
            <FormHelperText>
              {formContext?.errors?.[fieldProps.label]}
            </FormHelperText>
          )}
        </FormControl>
      );

    case "text":
      return (
        <TextField
          name={fieldProps.label}
          label={fieldProps.name}
          onChange={formContext?.handleChange}
          value={formContext?.values?.[fieldProps.label]}
          error={Boolean(formContext?.errors?.[fieldProps.label])}
          helperText={formContext?.errors?.[fieldProps.label]}
          variant="outlined"
          sx={{
            fontSize: "16px",

            width: "182px",
            padding: "1px 1px",
          }}
          inputProps={{
            style: {
              padding: "11px 26px 13px 12px",
            },
          }}
        ></TextField>
      );
    case "toggle":
      return (
        <FormControlLabel
          control={
            <Switch
              name={fieldProps.label}
              onChange={formContext?.handleChange}
              value={formContext?.values?.[fieldProps.label]}
              color="primary"
            />
          }
          label={fieldProps.name}
          labelPlacement="start"
        />
      );
    default:
      return <div>No Valid Field Type</div>;
      break;
  }
};
export default FormFieldConditionalRender;
