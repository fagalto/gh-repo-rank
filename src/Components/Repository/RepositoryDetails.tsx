import { GitRepo, viewHeight } from "../../Store/types";
import { connectToStore, ReduxType } from "../../Store/store";
import EmptyRepository from "./EmptyRepository";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import Chip from "@mui/material/Chip";

const RepositoryDetails = (props: ReduxType) => {
  const repo = props.filter.repoDetails as GitRepo;
  return Object.keys(repo).length > 0 ? (
    <Card sx={{ height: viewHeight * 0.95 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
          Repository Details
        </Typography>
        <Typography variant="h5" component="div">
          {repo.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {repo.full_name}
        </Typography>
        <Typography variant="body2">{repo.description}</Typography>
        <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
          Language
        </Typography>
        <Typography variant="body2" gutterBottom>
          {repo.language}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Tooltip title="number of repository watchers" arrow>
            <Chip icon={<PersonIcon />} label={repo.watchers} />
          </Tooltip>
          <Tooltip title="how many times repository has been forked" arrow>
            <Chip icon={<ForkRightIcon />} label={repo.forks} />
          </Tooltip>
        </Stack>
      </CardContent>
      <CardContent>
        <Button size="small" href={repo.html_url} color="primary" variant="outlined">
          View Homepage
        </Button>
      </CardContent>
    </Card>
  ) : (
    <EmptyRepository />
  );
};

export default connectToStore(RepositoryDetails);
