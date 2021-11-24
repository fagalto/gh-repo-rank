import * as React from "react";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { debounce } from "./debounce";
import { useDebounce } from "./useDebounce";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { isConstructorDeclaration } from "typescript";
import { connectToStore, ReduxType } from "../Store/store";

const SearchBox: React.FC<ReduxType> = function (props) {
  const searchHandle = (event: KeyboardEvent) => {
    //  event.key === "Enter" && props.searchHandle(value.text, props.filter.data);
  };

  const [value, setValue] = useState({
    text: "",
  });

  const inputItem = useDebounce<React.ChangeEvent<HTMLInputElement>>((e) => {
    setValue({ text: e.target.value });
    //props.searchHandle(e.target.value, props.filter.data)
  }, 300);

  return (
    <div>
      <TextField
        autoFocus
        variant="outlined"
        label="Search Phrase"
        onChange={inputItem}
        onKeyUp={searchHandle}
      />
    </div>
  );
};
export default connectToStore(SearchBox);
