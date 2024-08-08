import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// Utility function to initialize channels state
const initializeChannels = (data: {
  [key: string]: { [key: string]: string[] };
}) => {
  const channels: {
    [key: string]: {
      open: boolean;
      subs: { [key: string]: { open: boolean; subs: string[] } };
    };
  } = {};
  for (const main in data) {
    channels[main] = { open: false, subs: {} };
    for (const sub in data[main]) {
      channels[main].subs[sub] = { open: false, subs: data[main][sub] };
    }
  }
  return channels;
};

// Add prop types for PermDrawer component
interface PermDrawerProps {
  onChannelSelect: (channel: string) => void;
  selectedChannel: string | null;
  data: { [key: string]: { [key: string]: string[] } };
}

export default function PermDrawer({
  onChannelSelect,
  selectedChannel,
  data,
}: PermDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState(() => initializeChannels(data));

  useEffect(() => {
    setChannels(initializeChannels(data));
  }, [data]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (channel: string) => {
    onChannelSelect(channel);
    setChannels((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        open: !prev[channel].open,
      },
    }));
  };

  const handleSubClick = (main: string, sub: string) => {
    setChannels((prev) => ({
      ...prev,
      [main]: {
        ...prev[main],
        subs: {
          ...prev[main].subs,
          [sub]: {
            ...prev[main].subs[sub],
            open: !prev[main].subs[sub].open,
          },
        },
      },
    }));
  };

  const handleRefresh = () => {
    // Add refresh logic here
    console.log("Refresh button clicked");
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Object.keys(channels).map((main) => (
              <div key={main}>
                <ListItemButton onClick={() => handleClick(main)}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={main} />
                  {channels[main].open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={channels[main].open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {Object.keys(channels[main].subs).map((sub) => (
                      <div key={sub}>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => handleSubClick(main, sub)}
                        >
                          <ListItemIcon>
                            <MailIcon />
                          </ListItemIcon>
                          <ListItemText primary={sub} />
                          {channels[main].subs[sub].open ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={channels[main].subs[sub].open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {channels[main].subs[sub].subs.map(
                              (subsub, index) => (
                                <ListItemButton key={index} sx={{ pl: 8 }}>
                                  <ListItemIcon>
                                    <MailIcon />
                                  </ListItemIcon>
                                  <ListItemText primary={subsub} />
                                </ListItemButton>
                              )
                            )}
                          </List>
                        </Collapse>
                      </div>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {selectedChannel ? (
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
              {Object.keys(data[selectedChannel]).map((sub) => (
                <Box
                  key={sub}
                  sx={{
                    pl: 2,
                    mt: 2,
                    borderColor: "black",
                    border: 2,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="subtitle1">{sub}</Typography>
                  {data[selectedChannel][sub].map((subsub, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ pl: 2, mr: 10 }}
                    >
                      {subsub}
                    </Typography>
                  ))}
                  {/* <Box sx={{ mt: 'auto', alignSelf: 'flex-end', p: 1 }}>
                    <Button
                      variant='contained'
                      sx={{
                        borderRadius: 3,
                        padding: '6px 16px',
                        color: 'white', // Button text color
                        // backgroundColor: 'lightblue', // Button background color
                        // '&:hover': {
                        //   backgroundColor: 'darkblue', // Button hover background color
                        // }
                      }}
                    >
                      Send
                    </Button>
                  </Box> */}
                </Box>
              ))}
              <Box
                sx={{
                  position: "fixed",
                  bottom: 16,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <Button
                  variant='contained'
                  onClick={handleRefresh}
                  sx={{
                    borderRadius: 3,
                    padding: '6px 16px',
                    color: 'white', // Button text color
                    backgroundColor: 'green', // Button background color
                    '&:hover': {
                      backgroundColor: 'darkgreen', // Button hover background color
                    },
                  }}
                >
                  Refresh
                </Button> */}
              </Box>
            </Box>
          ) : null}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
