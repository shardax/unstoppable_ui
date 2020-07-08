import React, {useState, useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import './Browse/Browse.scss';

const RangeSlider = ( (props) => {

    const useStyles = makeStyles({
        root: {
          width: 200,
          color: "#9462a6"
        },
      });
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="age-range-input-wrap">
                <span>
                 Age Range
                </span>
                <span>
                    {/* <label className="age-range-label" for="age-min">Min</label> */}
                    <input id="age-min" value={props.ageRange[0]} className="age-range-input" />
                </span>
                <span> to </span>
                <span>
                    {/* <label className="age-range-label" for="age-max">Max</label> */}
                    <input  id="age-max" className="age-range-input" value={props.ageRange[1]} />
                </span>
            </div>
            <Slider 
                value={props.ageRange}
                onChange={props.onChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
            />
        </div>
    )
})

export default RangeSlider;