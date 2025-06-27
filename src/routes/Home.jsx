import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import GroupIcon from '@mui/icons-material/Group';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReceiptLong } from '@mui/icons-material';
import UsersList from '../components/UsersList'
import { Typography, Divider } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import TicketsList from '../components/customer_overview/TicketsList';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';



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
