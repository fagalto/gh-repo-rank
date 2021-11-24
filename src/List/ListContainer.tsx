import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../Store/store";
import List from "./List";
import * as types from "../Store/types";



//const data = { rows: exampleData };

const ListContainer = (props: ReduxType) => {


  return Object.keys(props.filter.data).length > 0 ? (
    <List {...props.filter.data} />
  ) : (
    <div>Loading...</div>
  );
};

export default  connectToStore(ListContainer);
