import React from "react";
import { Switch, Route } from "react-router-dom";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { route } from "../route";
import { deepPurple } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  offset: { ...theme.mixins.toolbar },
  title: {
    color: "white",
    display: "block",
    cursor: "pointer",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "100vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height: "100vh",
  },
}));

export default function RootNavigation(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [sidemenu] = React.useState(route);
  const token = useSelector((state) => state.token);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const barMenuOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHome = () => {
    history.push("/");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <Divider />

      <List>
        {sidemenu.map(
          (val, index) =>
            (val.role === null ||
              token?.user?.userType?.indexOf(val.role) >= 0) &&
            (localStorage.getItem("token")
              ? val.router !== "/login"
              : val.router !== "/logout") && (
              <ListItem
                button
                key={val.title}
                onClick={() => history.push(val.router)}
              >
                <ListItemIcon>{val.icon}</ListItemIcon>
                <ListItemText primary={val.title} />
              </ListItem>
            )
        )}
      </List>
      <Divider />
    </div>
  );

  const getRoutes = (routes) => {
    // eslint-disable-next-line
    return routes.map((prop, key) => {
      if (
        prop.role === null ||
        token?.user?.userType?.indexOf(prop.role) >= 0
      ) {
        return (
          <Route
            exact
            path={prop.router}
            component={prop.component}
            key={key}
          />
        );
      }
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            onClick={handleHome}
            variant="h6"
            noWrap
          >
            DATALIST
          </Typography>
          <div className={classes.grow} />
          <div onClick={handleDrawerClose}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {token?.user && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={barMenuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => history.push("/logout")}>
                  ออกจากระบบ
                </MenuItem>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Switch>{getRoutes(route)}</Switch>
      </Container>

      <Drawer anchor={"left"} open={open} onClose={handleDrawerClose}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar className={classes.purple}>
              {token?.user?.fname?.charAt(0)?.toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          {token?.user && (
            <ListItemText
              primary={token?.user?.fname + "  " + token?.user?.lname}
              secondary={token?.user?.username}
            />
          )}
          {!token?.user && (
            <ListItemText
              primary={"Guest"}
              secondary={"กรุณาเข้าสู่ระบบเพื่อใช้งาน"}
            />
          )}
        </ListItem>
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
