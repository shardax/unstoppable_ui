import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
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

    const defaultDistanceOrder = "asc";
    const defaultAgeOrder = "asc";
    const defaultLastOnlineOrder = "asc";
    const defaultNewestMemberOrder = "asc";
    const store = useDataStore();
    //const [order, setOrder] = React.useState('asc');
    const [distanceOrder, setDistanceOrder] = useState(props.distanceOrder || defaultDistanceOrder);
    const [ageOrder, setAgeOrder] = useState(props.ageOrder || defaultAgeOrder);
    const [lastOnlineOrder, setLastOnlineOrder] = useState(props.lastOnlineOrder || defaultLastOnlineOrder);
    const [newestMemberOrder, setNewestMemberOrder] = useState(props.newestMemberOrder || defaultNewestMemberOrder);
    const [fields, setFields] = useState(() => ['distance']);
    const [reset, setReset] = useState(props.reset || false);
  
    const handleField = (event, newFields) => {
      console.log("newFields", newFields);
      setFields(newFields);
    };
  
    const handleDistanceOrder = (event, newOrder) => {
      console.log("handleDistanceOrder", newOrder);
      setDistanceOrder(newOrder);
      setAgeOrder(defaultAgeOrder);
      setLastOnlineOrder(defaultLastOnlineOrder);
      setNewestMemberOrder(defaultNewestMemberOrder);
      props.onChange("distance", newOrder);
      setFields("distance");
    };

    const handleAgeOrder = (event, newOrder) => {
      console.log("handleAgeOrder", newOrder);
      setAgeOrder(newOrder);
      setDistanceOrder(defaultDistanceOrder);
      setLastOnlineOrder(defaultLastOnlineOrder);
      setNewestMemberOrder(defaultNewestMemberOrder);
      props.onChange("age", newOrder);
      setFields("age");
    };
  
    const handleLastOnlineOrder = (event, newOrder) => {
      console.log("handleLastOnlineOrder", newOrder);
      setLastOnlineOrder(newOrder);
      setDistanceOrder(defaultDistanceOrder);
      setAgeOrder(defaultAgeOrder);
      setNewestMemberOrder(defaultNewestMemberOrder);
      props.onChange("lastOnline", newOrder);
      setFields("lastOnline");
    };
  
    const handleNewestMemberOrder = (event, newOrder) => {
      console.log("handleNewestMemberOrder", newOrder);
      setNewestMemberOrder(newOrder);
      setLastOnlineOrder(newOrder);
      setDistanceOrder(defaultDistanceOrder);
      setAgeOrder(defaultAgeOrder);
      props.onChange("newestMember", newOrder);
      setFields("newestMember");
    };

    useEffect(() => {
      if (props.reset) {
        props.resetFunction(false)
      }
    }, [distanceOrder, ageOrder, lastOnlineOrder, newestMemberOrder, fields, reset]);


    const classes = useStyles();
  
    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          {/**  Distance **/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
              onChange={handleField}
              aria-label="text formatting"
            >
            <Tooltip disableFocusListener title="Click arrow on right to sort ">
              <ToggleButton value="distance" aria-label="distance">
                Distance
              </ToggleButton>
            </Tooltip >
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
                <Tooltip title="Click to sort by distance in ascending order" arrow>
                  <ArrowDropDownIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>}
              {(distanceOrder==="asc") && <ToggleButton value="desc" aria-label="centered"  onChange={handleDistanceOrder}>
              <Tooltip title="Click to sort by distance in descending order" arrow>
                <ArrowDropUpIcon />
              </Tooltip>
              </ToggleButton>}
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" className={classes.divider} />

          {/** Age **/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
             // onChange={handleField}
              aria-label="text formatting">
            <Tooltip disableFocusListener title="Click arrow on right to sort ">
              <ToggleButton value="age" aria-label="age">
                Age
              </ToggleButton>
            </Tooltip >
          </StyledToggleButtonGroup>
           {/**  Age order arrows **/}
          <StyledToggleButtonGroup
                size="small"
                value={ageOrder}
                exclusive
                onChange={handleAgeOrder}
                aria-label="text alignment">
                {(ageOrder==="desc") && <ToggleButton value="asc" aria-label="left aligned" onChange={handleAgeOrder}>
                <Tooltip title="Click to sort by age in ascending order" arrow>
                  <ArrowDropDownIcon fontSize="small" />
                </Tooltip>
                </ToggleButton>}
                {(ageOrder==="asc") && <ToggleButton value="desc" aria-label="centered" onChange={handleAgeOrder}>
                <Tooltip title="Click to sort by age in descending order" arrow>
                  <ArrowDropUpIcon />
                </Tooltip >
                </ToggleButton>}
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" className={classes.divider} />
         
          {/** Last Online **/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
              //onChange={handleField}
              aria-label="text formatting">
            <Tooltip disableFocusListener title="Click arrow on right to sort ">
             <ToggleButton value="lastOnline" aria-label="lastOnline">
                Last Online
              </ToggleButton>
            </Tooltip>
          </StyledToggleButtonGroup>
           {/**  lastOnlineOrder arrows **/}
          <StyledToggleButtonGroup
              size="small"
              value={lastOnlineOrder}
              exclusive
              onChange={handleLastOnlineOrder}
              aria-label="text alignment">
              
              {(lastOnlineOrder==="desc") &&
                <ToggleButton value="asc" aria-label="left aligned" onChange={handleLastOnlineOrder}>
                  <Tooltip title="Click to sort by Last Online in ascending order" arrow>
                    <ArrowDropDownIcon fontSize="small" />
                  </Tooltip >
                </ToggleButton>}
              {(lastOnlineOrder==="asc") &&
                <ToggleButton value="desc" aria-label="centered" onChange={handleLastOnlineOrder}>
                  <Tooltip title="Click to sort by Last Online in descending order" arrow>
                    <ArrowDropUpIcon />
                  </Tooltip >
                </ToggleButton>}
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" className={classes.divider} />

          {/** Newest Member**/}
          <StyledToggleButtonGroup
              size="small"
              value={fields}
              onChange={handleField}
              aria-label="text formatting"
            >
            <Tooltip disableFocusListener title="Click arrow on right to sort ">
              <ToggleButton value="newestMember" aria-label="age">
                  Newest Member
               </ToggleButton>
            </Tooltip >
          </StyledToggleButtonGroup>
           {/**  Newest Member order arrows **/}
          <StyledToggleButtonGroup
              size="small"
              value={newestMemberOrder}
              exclusive
              onChange={handleNewestMemberOrder}
              aria-label="text alignment">

              {(newestMemberOrder==="desc") && 
                <ToggleButton value="asc" aria-label="left aligned" onChange={handleNewestMemberOrder}>
                  <Tooltip title="Click to sort by Newest Member in ascending order" arrow>
                    <ArrowDropDownIcon fontSize="small" />
                  </Tooltip>
                </ToggleButton>}
              {(newestMemberOrder==="asc") && 
                <ToggleButton value="desc" aria-label="centered" onChange={handleNewestMemberOrder}>
                  <Tooltip title="Click to sort by Newest Member in descending order" arrow>
                    <ArrowDropUpIcon />
                  </Tooltip>
                </ToggleButton>}
          </StyledToggleButtonGroup>
          <Divider flexItem orientation="vertical" className={classes.divider} />
          
        </Paper>
      </div>
    );
  })
  export default  SortBarDisplay;