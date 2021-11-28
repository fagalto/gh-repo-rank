import { Stack, Typography, Chip } from "@mui/material";
import { connectToStore, ReduxType } from "../../Store/store";
import { sortedBy } from "../../Store/types";
import Menu from "../Menu/Menu";
import DownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import UpIcon from "@mui/icons-material/ArrowDropUpOutlined";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";

export const ListHeader = (props: ReduxType) => {
  const sort = {
    contributions: "total_contributions",
    followers: "followers",
    repos: "total_ReposAndGists",
  };
  const prevSort = props.filter.sortedBy;

  const handleClick = (item: string) => {
    const order = prevSort.name !== item ? false : !prevSort.desc;
    const sortedBy: sortedBy = { name: item, desc: order };
    const ret = props.filter.data.sort(dynamicSort(item, order));
    props.setSortedArray(ret, sortedBy);
  };

  function dynamicSort(propertyName: string, descending: boolean) {
    const sortOrder = descending ? 1 : -1;
    return function (a: any, b: any) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[propertyName] < b[propertyName] ? -1 : a[propertyName] > b[propertyName] ? 1 : 0;
      return result * sortOrder;
    };
  }
  const barTitle = `Loading data progress : ${props.filter.loadingProgress}% It may take few minutes`;
  const progresBar = props.filter.isLoading ? (
    <Box sx={{ width: "100%" }}>
      <Tooltip title={barTitle} arrow>
        <LinearProgress
          variant="buffer"
          value={props.filter.loadingProgress}
          valueBuffer={props.filter.loadingProgress}
        />
      </Tooltip>
    </Box>
  ) : null;
  const sorter = Object.entries(sort).map((elem: any, key: number) => {
    const icon =
      elem[1] === prevSort.name ? prevSort.desc === true ? <UpIcon /> : <DownIcon /> : undefined;

    return (
      <Chip
        onClick={() => handleClick(elem[1])}
        label={elem[0]}
        key={key}
        icon={icon}
        size="small"
        variant="outlined"
      />
    );
  });
  return (
    <Box>
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        <Menu />
        <Typography component="div" variant="h5">
          {props.filter.communityName} community
        </Typography>
      </CardContent>
      {progresBar}
      <Card
        sx={{
          display: "flex",
          padding: "15px",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography color="text.secondary">Sort by </Typography>
        <Stack direction="row" spacing={1}>
          {sorter}
        </Stack>
      </Card>
    </Box>
  );
};

export default connectToStore(ListHeader);
