import React, {useState, useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

const RangeSlider = ( (props) => {

    const useStyles = makeStyles({
        root: {
          width: 200,
        },
      });
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
            Age Range
            </Typography>
            <Slider 
                value={props.ageRange}
                onChange={props.onChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelDisplay="on"
            />
        </div>
    )
})

export default RangeSlider;