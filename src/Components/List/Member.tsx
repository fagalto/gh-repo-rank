import { connectToStore, ReduxType } from "../../Store/store";

import * as types from "../../Store/types";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Group from "@mui/icons-material/Group";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";

//const data = { rows: exampleData };
interface Member extends ReduxType {
  userProps: types.userDetailInfo;
}

const Row = (props: Member) => {
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
            alignItems: "center",
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
                label={props.filter.isLoading ? <Skeleton /> : props.userProps.total_contributions}
              />
            </Tooltip>
            <Tooltip title="No. of followers" arrow>
              <Chip
                size="small"
                variant="outlined"
                icon={<Group />}
                label={props.filter.isLoading ? <Skeleton /> : props.userProps.followers}
              />
            </Tooltip>
            <Tooltip title="public repos & gists" arrow>
              <Chip
                size="small"
                variant="outlined"
                icon={<ForkRightIcon />}
                label={props.filter.isLoading ? <Skeleton /> : reposAndGists}
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

export default connectToStore(Row);
