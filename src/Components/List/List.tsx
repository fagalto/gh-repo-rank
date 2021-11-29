import Member from "./Member";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import * as types from "../../Store/types";
import { connectToStore, ReduxType } from "../../Store/store";
import Card from "@mui/material/Card";
import ListHeader from "./ListHeader";

/*
Members are presented in virtualized list for cases where member arrays could be huge
*/

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
    <Card sx={{ height: types.viewHeight * 0.95 }}>

      <ListHeader />
      <FixedSizeList
        height={types.viewHeight * 0.7}
        width={"100%"}
        itemSize={50}
        itemCount={len}
        overscanCount={30}>
        {renderRow}
      </FixedSizeList>
    </Card>
  );
};
export default connectToStore(VirtualizedList);
