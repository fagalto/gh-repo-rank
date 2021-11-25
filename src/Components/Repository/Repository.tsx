import { repo } from "../../Store/types";
import Chip from "@mui/material/Chip";

const Repository = (repo: repo) => {
  return <Chip label={repo.name} component="a" href={repo.url} variant="outlined" clickable />;
};
export default Repository;
