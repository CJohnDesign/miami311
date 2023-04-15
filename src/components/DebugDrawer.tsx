import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  logMessage: string; // Prop for the console log message
}

const MyDrawer: React.FC<DrawerProps> = ({ open, onClose, logMessage }) => {
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
    <Drawer open={open} onClose={handleDrawerClose}>
      <List>
        <ListItem button onClick={handleLogClick}>
          <ListItemText primary="Display Console Log" />
        </ListItem>
        {logDisplayed && (
          <ListItem>
            <ListItemText primary={logMessage} />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default MyDrawer;
