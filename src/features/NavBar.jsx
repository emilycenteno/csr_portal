import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Home"
            sx={{ mr: 2 }}
          >
            <HomeIcon onClick={() => navigate('/')}
            />
          </IconButton>
          <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AMP Customer Service Portal
          </Typography>
          <Typography align="right" variant="h7" component="div" sx={{ flexGrow: 1 }}>
            Welcome, TEST_ADMIN
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}