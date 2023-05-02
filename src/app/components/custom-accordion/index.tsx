
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "1px",
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CustomAccordion = ({
  expanded,
  handleChange,
  value,
  title,
  schema = [],
}: any) => {
  return (
    <Accordion expanded={expanded === value} onChange={handleChange(value)}>
      <AccordionSummary
        aria-controls={`${value}-content`}
        id={`${value}-header`}
        expandIcon={
          expanded === value ? (
            <MinimizeIcon></MinimizeIcon>
          ) : (
            <AddIcon></AddIcon>
          )
        }
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container sx={{ marginLeft: "64px", marginTop: "28px" }}>
          {schema?.map((schemaItem: any) => (
            <Grid item key={schemaItem.name} xs={12}>
              <Typography
                component={"label"}
                sx={{
                  width: "143px",
                  display: "inline-block",
                  fontSize: "16px",
                  marginRight: "41px",
                  textAlign: "right",
                }}
              >
                {schemaItem.name}
              </Typography>
              {schemaItem?.group === "yes" ? (
                <>
                  {schemaItem.children.map((item: any) => {
                    if (item.type === "dropdown") {
                      return (
                        <FormControl
                          key={item.name}
                          sx={{ minWidth: "182px", marginBottom: "20px" }}
                        >
                          <Select
                            value={""}
                            onChange={(e) => console.log(e)}
                            displayEmpty
                            input={<BootstrapInput></BootstrapInput>}
                          >
                            {item.options.map((option: any) => (
                              <MenuItem key={value} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    }
                    return (
                      <TextField
                        key={item.name}
                        name={item.name}
                        variant="outlined"
                        sx={{
                          fontSize: "16px",
                          marginBottom: "20px",
                          width: "182px",
                          padding: "1px 1px",
                        }}
                        inputProps={{
                          style: {
                            padding: 1,
                          },
                        }}
                      ></TextField>
                    );
                  })}
                </>
              ) : (
                <>
                  {schemaItem.type === "dropdown" ? (
                    <FormControl
                      key={schemaItem.name}
                      sx={{ minWidth: "182px", marginBottom: "20px" }}
                    >
                      <Select
                        value={""}
                        onChange={(e) => console.log(e)}
                        displayEmpty
                        input={<BootstrapInput></BootstrapInput>}
                      >
                        {schemaItem.options.map((option: any) => (
                          <MenuItem key={value} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      variant="outlined"
                      sx={{
                        fontSize: "16px",
                        marginBottom: "20px",
                        width: "182px",
                        padding: "1px 1px",
                      }}
                      inputProps={{
                        style: {
                          padding: 1,
                        },
                      }}
                    ></TextField>
                  )}
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
