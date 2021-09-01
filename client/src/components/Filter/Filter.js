import {
  Grid,
  InputLabel,
  NativeSelect,
  Slider,
  Typography,
  FormControl,
  makeStyles,
  InputBase,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 25,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function valuetext(value) {
  return `${value}`;
}

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
      marginBottom: 25,
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const Filter = ({ categories, handlerFilter, maxPrice, minPrice }) => {
  const classes = useStyles();
  const [filterName, setFilterName] = useState("");
  const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

  const handleChangeFilterName = (filterName) => {
    setFilterName(filterName);
    handlerFilter(filterName, sliderValue);
  };

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    handlerFilter(filterName, sliderValue);
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-select-native">
              Filter by:
            </InputLabel>
            <NativeSelect
              input={<BootstrapInput />}
              onChange={(e) => handleChangeFilterName(e.target.value)}
            >
              {categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Grid container justifyContent="space-between">
            <Typography>{sliderValue[0]}</Typography>
            <Typography>{sliderValue[1]}</Typography>
          </Grid>
          <Slider
            value={sliderValue}
            onChange={handleChange}
            marks
            step={10}
            max={maxPrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Filter;
