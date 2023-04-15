import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  logMessage: string; // Prop for the console log message
}

const useStyles = makeStyles(() => ({
  drawer: {
    width: 400,
    backgroundColor: '#1C2331',
  },
  listItem: {
    color: 'white',
  },
}));

const MyDrawer: React.FC<DrawerProps> = ({ open, onClose, logMessage }) => {
  const classes = useStyles();
  const [logDisplayed, setLogDisplayed] = useState(false);

  const handleDrawerClose = () => {
    setLogDisplayed(false);
    onClose();
  };

  const handleLogClick = () => {
    console.log(logMessage);
    setLogDisplayed(true);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
      classes={{ paper: classes.drawer }}
    >
      <List>
        <ListItem button onClick={handleLogClick} className={classes.listItem}>
          <ListItemText primary="Display Console Log" />
        </ListItem>
        {logDisplayed && (
          <ListItem className={classes.listItem}>
            <ListItemText primary={logMessage} />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default MyDrawer;
