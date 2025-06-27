import {
  Box, Drawer, CssBaseline, Toolbar, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import { ReceiptLong } from '@mui/icons-material';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import UsersList from '../components/UsersList';
import TicketsList from '../components/TicketsList';


const drawerWidth = 240;

export default function Home() {
  const [showUsers, setShowUsers] = useState(true);
  const [showTickets, setShowTickets] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem key='customerList'>
            <ListItemButton onClick={() => {
              setShowUsers(true);
              setShowTickets(false);
            }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText>
                Customers List
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem key='openTickets'>
            <ListItemButton onClick={() => {
              setShowUsers(false);
              setShowTickets(true);
            }}>
              <ListItemIcon>
                <ReceiptLong />
              </ListItemIcon>
              <ListItemText>
                Open Tickets
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider sx={{ width: '90%', mx: 'auto' }} />


          <ListItem key='dashboard'>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText>
                Dashboard
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem key='settings'>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>
                Settings
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem key='reports'>
            <ListItemButton>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText>
                Reports
              </ListItemText>
            </ListItemButton>
          </ListItem>



        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >

        {
          showUsers &&
          <UsersList usersData={useLoaderData()} />
        }
        {
          showTickets && <TicketsList customers={useLoaderData()} />
        }


      </Box>
    </Box >
  );
}
