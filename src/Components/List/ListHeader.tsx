import { Stack, Typography, Chip } from "@mui/material";
import { connectToStore, ReduxType } from "../../Store/store";
import { userDetailInfo } from "../../Store/types";

export const ListHeader = (props: ReduxType) => {
  const sort = {
    contributions: "total_contributions",
    followers: "followers",
    ownRepos: "total_ReposAndGists",
  };

  const handleClick = (item: string) => {
    console.info("You clicked the Chip.", item);
    const ret = props.filter.data.sort(dynamicSort(item, item===props.filter.sortedBy));
    props.setSortedArray(ret,item);
  };

  function dynamicSort(propertyName: string, descending: boolean) {
    const sortOrder = descending?1:-1
    return function (a: any, b: any) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[propertyName] < b[propertyName] ? -1 : a[propertyName] > b[propertyName] ? 1 : 0;
      return result * sortOrder;
    };
  }

  const sorter = Object.entries(sort).map((elem: any, val: any) => (
    <Chip onClick={() => handleClick(elem[1])} label={elem[0]} size="small" variant="outlined" />
  ));
  return (
    <Typography sx={{ fontSize: 14, display: "flex" }} color="text.secondary">
      Sort by{" "}
      <Stack direction="row" spacing={1}>
        {sorter}
      </Stack>
    </Typography>
  );
};

export default connectToStore(ListHeader);
