import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import List from "./List";
import * as types from "../../Store/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Group from "@mui/icons-material/Group";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Tooltip from "@mui/material/Tooltip";

//const data = { rows: exampleData };
interface Member extends ReduxType {
  userProps: types.userDetailInfo;
}

const Member = (props: Member) => {
  const handleClick = () => {
    props.setMembertoDetailedView(props.userProps);
  };
  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  };
  const reposAndGists =
    parseNum(props.userProps.public_repos) + parseNum(props.userProps.public_gists);

  return Object.keys(props).length > 0 ? (
    <div onClick={handleClick}>
      <Card sx={{ display: "flex", alignItems: "flex-start" }}>
        <CardMedia
          component="img"
          sx={{ height: 50, width: "auto" }}
          image={props.userProps.avatar_url}
        />

        <CardContent
          sx={{
            display: "flex",
            width: "100%",
            padding: "5px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Typography component="div" variant="subtitle2">
            {props.userProps.login}
          </Typography>
          <Stack direction="row">
            <Tooltip title="Total contributions" arrow>
              <Chip
                size="small"
                variant="outlined"
                icon={<VolunteerActivismIcon />}
                label={props.userProps.total_contributions}
              />
            </Tooltip>
            <Tooltip title="No. of followers" arrow>
              <Chip
                size="small"
                variant="outlined"
                icon={<Group />}
                label={props.userProps.followers}
              />
            </Tooltip>
            <Tooltip title="public repos & gists" arrow>
              <Chip
                size="small"
                variant="outlined"
                icon={<ForkRightIcon />}
                label={reposAndGists}
              />
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default connectToStore(Member);
