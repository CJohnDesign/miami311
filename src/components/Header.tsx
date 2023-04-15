import { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core/index.js';
import { Code as CodeIcon } from '@material-ui/icons';
import DebugDrawer from './DebugDrawer';
import { makeStyles } from '@material-ui/core/styles/index.js';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'transparent',
        position: 'absolute',
        boxShadow: 'none',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

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
            <DebugDrawer open={debugDrawerOpen} onClose={handleDebugDrawerClose} logMessage={''} />
        </>
    );
};

export default Header;
