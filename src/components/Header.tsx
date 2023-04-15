import { useState } from 'react';
import DebugDrawer from './DebugDrawer';

const Header = () => {
  const [debugDrawerOpen, setDebugDrawerOpen] = useState(false);

  const handleDebugButtonClick = () => {
    setDebugDrawerOpen(true);
  };

  const handleDebugDrawerClose = () => {
    setDebugDrawerOpen(false);
  };

  return (
    <>
      <header style={{ backgroundColor: 'transparent', position: 'absolute', top: 0, right: 0, zIndex: 9999 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleDebugButtonClick} style={{ color: 'white', backgroundColor: 'transparent', border: 'none', padding: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 700 700">
              <path d="m252.4 181.67-98.488 98.488 98.488 98.488c13.668 13.598 13.668 35.684 0 49.281-13.598 13.578-35.613 13.578-49.211 0l-123.16-123.18c-13.598-13.578-13.598-35.594 0-49.211l123.16-123.16c13.598-13.668 35.613-13.668 49.211 0 13.668 13.617 13.668 35.703 0 49.301zm367.31 73.465-122.76-122.76c-13.598-13.668-35.543-13.668-49.156 0-13.598 13.527-13.598 35.543 0 49.086l98.211 98.211-98.211 98.211c-13.598 13.598-13.598 35.543 0 49.156 13.598 13.578 35.543 13.578 49.156 0l122.76-122.85c13.578-13.508 13.578-35.508 0-49.051zm-242.23-130.81c-19.074-3.3438-37.188 9.3633-40.531 28.438l-42.578 241.2c-3.3438 19.074 9.3633 37.188 28.438 40.531 19.004 3.4141 37.117-9.293 40.531-28.367l42.523-241.27c3.3242-19.008-9.3789-37.117-28.383-40.531z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>
      {debugDrawerOpen && <DebugDrawer onClose={handleDebugDrawerClose} logMessage={''} open={debugDrawerOpen} />}
    </>
  );
};

export default Header;
