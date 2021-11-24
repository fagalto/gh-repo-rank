import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../Store/store";
import List from "./List";
import * as types from "../Store/types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";


//const data = { rows: exampleData };
interface Member extends ReduxType {
userProps: types.userDetailInfo
}

const Member = (props: Member) => {
  const [dt, setData] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      //props.fetchMemberData(props.userProps.url);

      //setData(1);
    };

    fetchData();
  }, []);

  const parseNum = (doubtIfItsNumber: any) => {
    return typeof doubtIfItsNumber == "number" ? doubtIfItsNumber : 0;
  }
  const reposAndGists =
    parseNum(props.userProps.public_repos) + parseNum(props.userProps.public_gists);

  return Object.keys(props).length > 0 ? (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ height: 100, width: "auto" }}
        image={props.userProps.avatar_url}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {props.userProps.login}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Tolal Contributions: { props.userProps.total_contributions} Repos&Gists:{reposAndGists} | followers:
            {props.userProps.followers}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  ) : (
    <div>Loading...</div>
  );
};

export default connectToStore(Member);