import { useState, useEffect } from "react";
import "./App.css";
import List from "./List/ListContainer";
import Container from "@mui/material/Container";
import * as types from "./Store/types";
import { auth } from "./DataExample/Data";

import { connectToStore, ReduxType } from "./Store/store";

type Rows = {
  rows: object[];
  filteredRows: object[];
};

const FilteredTable: React.FC<ReduxType> = function (props) {
  const [dt, setData] = useState({ communityFetchStarted: false, userDetailsStarted: false });

  useEffect(() => {
    const fetchData = () => {
      props.fetchCommunityData();

      setData({ ...dt, communityFetchStarted: true });
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUsers = () => {
    
      (dt.userDetailsStarted == false && props.filter.data.length>0) && props.fetchAllUsers(props.filter.data)&&setData({ ...dt, userDetailsStarted: true });
    };

    fetchUsers();
  });


  return Object.keys(props.filter.data).length > 0 ? (
    <Container sx={{ paddingTop: "20px" }}>
      <List />
    </Container>
  ) : (
    <div>Loading...</div>
  );
};

export default connectToStore(FilteredTable);
