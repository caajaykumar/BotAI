import { Outlet } from 'react-router-dom';
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import { Grid, Box } from '@mui/material';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))',
          }}
        >
          {/* Sidebar */}
          <Box
            sx={{
              width: { xs: '70%', md: '250px' },
              position: { xs: 'fixed', md: 'relative' },
              height: '100vh',
              bgcolor: 'primary.light',
              zIndex: { xs: 9999, md: 1 },
              transform: {
                xs: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                md: 'none',
              },
              transition: 'transform 400ms ease',
              boxShadow: { xs: menuOpen ? 10 : 0, md: 0 },
            }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Box>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { xs: '100%', md: 'calc(100% - 250px)' },
              ml: { md: '250px' },
              p: 2,
            }}
          >
            <Outlet
              context={{
                chat: chat,
                setChat: setChat,
                handleMobileMenu: setMenuOpen,
              }}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
