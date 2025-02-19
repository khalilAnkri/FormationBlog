import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      "& .MuiDrawer-paper": { width: drawerWidth },
    }),
    ...(!open && {
      "& .MuiDrawer-paper": { width: theme.spacing(7) },
    }),
  })
);

export default function MyMiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

 
  const iconButtons = [
    { icon: <FavoriteIcon />, text: "Favorites" , link : " /favorites"},
    { icon: <BookIcon />, text: "Books" , link : " /myblogs"},
    { icon: <SettingsIcon />, text: "Settings" , link : "/settings"},
  ];
  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      <Drawer variant="permanent" open={open}>
        
        
        <List style={{marginTop: "100px"}}>
          
          {iconButtons.map((item, index)=>(
            <Link href={item.link} passHref key={index}>
              <ListItem key={index} disablePadding sx={{marginTop: "20px"}}>
                <ListItemButton>
                  <ListItemIcon  sx={{
                      color: theme.palette.primary.second,
                      "&:hover": {
                        color: theme.palette.secondary.main,
                      },
                    }}>
                    {item.icon}
                  </ListItemIcon>
                  {item.text}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          
        </List>
      </Drawer>
       
    </Box>
  );
}
