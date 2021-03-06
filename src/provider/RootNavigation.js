import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Switch, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { route } from "../route";
import { deepPurple } from "@material-ui/core/colors";
import LoadingBar from "react-top-loading-bar";
import { StateContext } from "./StateProvider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[300]),
    backgroundColor: deepPurple[300],
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const barMenuOpen = Boolean(anchorEl);
  const [sidemenu] = useState(route);
  const token = useSelector((state) => state.token);
  const matches_sm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { progress } = useContext(StateContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
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
                onClick={() => {
                  history.push(val.router) 
                  handleDrawerToggle()
                }}
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

  const drawer = (
    <>
      {matches_sm && <Toolbar variant="dense" />}
      <ListItem button>
        <ListItemAvatar style={{ margin: -8 }}>
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
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Res
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            {/* {token?.user && ( */}
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
            {/* )} */}

          </div>

        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            anchor={"left"}
            variant="permanent"
            className={classes.drawer}
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Toolbar variant="dense" />
        <LoadingBar progress={progress} />
        <Switch>{getRoutes(route)}</Switch>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
