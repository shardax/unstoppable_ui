import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



const DiscreteSlider = ( (props) => {

  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  const marks = [
    {
      value: 10,
      label: '10 miles',
    },
    {
      value: 50,
      label: '50 miles',
    },
    {
      value: 99,
      label: '100+ miles',
    },
  ];
  
  function valuetext(value) {
    //alert(value);
    return `${value}°C`;
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Distance
      </Typography>
      <Slider
        defaultValue={99}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={props.onChange}
        step={10}
        marks={marks}
        min={10}
        max={99}
      />
    </div>
  );
})
export default DiscreteSlider;
