import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InfoIcon from "@mui/icons-material/Info";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { connectToStore, ReduxType } from "../../Store/store";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const IconMenu = (props: ReduxType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [author, setAuthor] = React.useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReload = () => {
    props.refreshData();
  };
  useEffect(() => {
    const fetchData = () => {
      props.getAuthor("https://api.github.com/users/fagalto");
    };
    fetchData();
  }, []);
  const handleAuthor = () => {
    props.filter.author !== null && props.setMembertoDetailedView(props.filter.author);
  };

  return (
    <div>
      {" "}
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MenuOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuList>
          <MenuItem onClick={handleReload}>
            <ListItemIcon>
              <RefreshOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Reload data from Github</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAuthor}>
            <ListItemIcon>
              <InfoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
export default connectToStore(IconMenu);
