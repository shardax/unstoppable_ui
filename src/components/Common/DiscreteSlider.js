import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {DISTANCE_WITHIN_CONSTANT} from '../../constants/ProfileConstants';




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
  
  /*function valuetext(value) {
    alert(value);
    return `${value}°C`;
  }*/
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Distance
      </Typography>
      <Slider
        defaultValue={props.distance}
        //getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onChange={props.onChange}
        step={10}
        marks={marks}
        min={10}
        max={DISTANCE_WITHIN_CONSTANT}
      />
    </div>
  );
})
export default DiscreteSlider;
