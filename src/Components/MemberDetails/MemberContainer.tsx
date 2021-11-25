import { useState, useEffect } from "react";
import { connectToStore, ReduxType } from "../../Store/store";
import * as types from "../../Store/types";
import MemberDetails from "./MemberDetails"

//const data = { rows: exampleData };

const MemberContainer = (props: ReduxType) => {
    const member = props.filter.memberToView
    const prop = { member: props.filter.memberToView };
    return typeof member !== "string" ? (
        
        <MemberDetails {...prop} />
  ) : (
    <div>Loading...</div>
  );
};

export default connectToStore(MemberContainer);
