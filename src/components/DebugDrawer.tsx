import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

interface DebugDrawerProps {
  open: boolean;
  onClose: () => void;
  logMessage: string; // Prop for the console log message
}

const useStyles = makeStyles({
  drawerPaper: {
    width: '400px', // set the width of the drawer
  },
});

const DebugDrawer: React.FC<DebugDrawerProps> = ({ open, onClose, logMessage }) => {
  const [logDisplayed, setLogDisplayed] = useState(false);
  const classes = useStyles();

  const handleDrawerClose = () => {
    setLogDisplayed(false);
    onClose();
  };

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={handleDrawerClose} 
      classes={{ paper: classes.drawerPaper }} // apply the custom class to the paper element
      className='bg-slate-900'
    >
      <List>
        <ListItem>
          <ListItemText primary="Display Console Log" />
        </ListItem>
        
      </List>
    </Drawer>
  );
};

export default DebugDrawer;
