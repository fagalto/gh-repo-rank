import { Stack, Typography, Chip } from "@mui/material";
import { connectToStore, ReduxType } from "../../Store/store";
import { sortedBy, userDetailInfo } from "../../Store/types";
import DownIcon from "@mui/icons-material/ArrowDropDownOutlined";
import UpIcon from "@mui/icons-material/ArrowDropUpOutlined";
import Card from "@mui/material/Card";

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

  const sorter = Object.entries(sort).map((elem: any, val: any) => {
    const icon =
      elem[1] == prevSort.name ? prevSort.desc === true ? <UpIcon /> : <DownIcon /> : null;

    return icon === null ? (
      <Chip onClick={() => handleClick(elem[1])} label={elem[0]} size="small" variant="outlined" />
    ) : (
      <Chip
        onClick={() => handleClick(elem[1])}
        label={elem[0]}
        icon={icon}
        size="small"
        variant="outlined"
      />
    );
  });
  return (
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
  );
};

export default connectToStore(ListHeader);