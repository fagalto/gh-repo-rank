import { repo } from "../../Store/types";
import Chip from "@mui/material/Chip";
import { ReduxType, connectToStore } from "../../Store/store";

interface repositoryChip extends ReduxType {
  repo: repo;
}

const Repository = (props: repositoryChip) => {
  const handleClick = (repositoryUrl: string) => {
    props.setRepoToDetailedView(repositoryUrl);
  };
  return (
    <Chip
      size="small"
      label={props.repo.name}
      component="a"
      onClick={() => handleClick(props.repo.url)}
      variant="outlined"
      clickable
    />
  );
};
export default connectToStore(Repository);
