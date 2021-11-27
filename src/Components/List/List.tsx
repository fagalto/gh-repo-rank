import * as React from "react";
import Box from "@mui/material/Box";
import Member from "./Member";
import { FixedSizeList, ListChildComponentProps, VariableSizeList } from "react-window";
import * as types from "../../Store/types";
import { connectToStore, ReduxType } from "../../Store/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListHeader from "./ListHeader";

const VirtualizedList = (props: ReduxType) => {
  const renderRow = (prop: ListChildComponentProps) => {
    const { index, style } = prop;
    const rowData = { userProps: props.filter.data[index] };
    return (
      <div style={style} key={index} className="bigTableRow">
        <Member {...rowData} />
      </div>
    );
  };
  const len = props.filter.data.length;
  return (
    <Card>
      <Typography component="div" variant="h5">
        Members of {props.filter.communityName} community
      </Typography>
      <ListHeader />
      <FixedSizeList
        height={types.viewHeight * 0.8}
        width={"100%"}
        itemSize={50}
        itemCount={len}
        overscanCount={5}>
        {renderRow}
      </FixedSizeList>
    </Card>
  );
};
export default connectToStore(VirtualizedList);
