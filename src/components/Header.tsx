import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import DebugDrawer from './DebugDrawer';

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
