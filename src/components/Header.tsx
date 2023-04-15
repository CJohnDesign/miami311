import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar/index.js';
import Toolbar from '@material-ui/core/Toolbar/index.js';
import IconButton from '@material-ui/core/IconButton/index.js';
import CodeIcon from '@material-ui/icons/Code';
import DebugDrawer from './DebugDrawer';
import { makeStyles } from '@material-ui/core/styles/index.js';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const Header = () => {
  const classes = useStyles();
  const [debugDrawerOpen, setDebugDrawerOpen] = useState(false);

  const handleDebugButtonClick = () => {
    setDebugDrawerOpen(true);
  };

  const handleDebugDrawerClose = () => {
    setDebugDrawerOpen(false);
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" onClick={handleDebugButtonClick}>
            <CodeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DebugDrawer open={debugDrawerOpen} onClose={handleDebugDrawerClose} />
    </>
  );
};

export default Header;
