import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useDataStore } from "../../UserContext";

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  }));
  
  const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }))(ToggleButtonGroup);

  const SortBarDisplay = ( (props) => {

  //export default function SortBarDisplay() {
    const store = useDataStore();
    const [order, setOrder] = React.useState('asc');
    const [distanceOrder, setDistanceOrder] = React.useState('asc');
    const [ageOrder, setAgeOrder] = React.useState('asc');
    const [fields, setFields] = React.useState(() => ['distance']);
  
    const handleField = (event, newFields) => {
      console.log(newFields);
      setFields(newFields);
    };
  
    const handleOrder = (event, order) => {
      setOrder(order);
    };


    const handleDistanceOrder = (event, newOrder) => {
      console.log("handleDistanceOrder", newOrder);
      setDistanceOrder(newOrder);
      props.onChange("distance");
      //setFields(newFields);
    };

    const handleAgeOrder = (event, newOrder) => {
      console.log("handleAgeOrder", newOrder);
      setAgeOrder(newOrder);
      props.onChange("age");
      //setFields(newFields);
    };
  
  
    const classes = useStyles();
  
    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          {/**  Distance **/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
              //onChange={handleField}
              aria-label="text formatting"
            >
              <ToggleButton value="distance" aria-label="distance">
                Distance
              </ToggleButton>
          </StyledToggleButtonGroup>
          {/**  Distance order arrows **/}
          <StyledToggleButtonGroup
              size="small"
              value={distanceOrder}
              exclusive
              onChange={handleDistanceOrder}
              aria-label="text alignment"
            >
              {(distanceOrder==="desc") && <ToggleButton value="asc" aria-label="left aligned" onChange={handleDistanceOrder}>
                <ArrowDropDownIcon fontSize="small" />
              </ToggleButton>}
              {(distanceOrder==="asc") && <ToggleButton value="desc" aria-label="centered"  onChange={handleDistanceOrder}>
              <ArrowDropUpIcon />
              </ToggleButton>}
          </StyledToggleButtonGroup>
          {/** Age **/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
              onChange={handleField}
              aria-label="text formatting"
            >
            <ToggleButton value="age" aria-label="age">
                Age
              </ToggleButton>
          </StyledToggleButtonGroup>
           {/**  Age order arrows **/}
          <StyledToggleButtonGroup
                size="small"
                value={ageOrder}
                exclusive
                onChange={handleAgeOrder}
                aria-label="text alignment"
              >
              
                {(ageOrder==="desc") && <ToggleButton value="asc" aria-label="left aligned" onChange={handleAgeOrder}>
                  <ArrowDropDownIcon fontSize="small" />
                </ToggleButton>}
                {(ageOrder==="asc") && <ToggleButton value="desc" aria-label="centered" onChange={handleAgeOrder}>
                <ArrowDropUpIcon />
                </ToggleButton>}
          </StyledToggleButtonGroup>
          <StyledToggleButtonGroup>
            
            <ToggleButton value="underlined" aria-label="lastonline">
              Last Online
            </ToggleButton>
            <ToggleButton value="color" aria-label="newestmember">
              Newest Members
            </ToggleButton>
          </StyledToggleButtonGroup>

          <StyledToggleButtonGroup
            size="small"
            value={order}
            exclusive
            onChange={handleOrder}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <ArrowDropDownIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
             <ArrowDropUpIcon />
            </ToggleButton>
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" className={classes.divider} />
          
        </Paper>
      </div>
    );
  })
  export default  SortBarDisplay;