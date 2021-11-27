import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

const EmptyRepository = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Repository Details
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Select any of member repositories to view it's Details
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyRepository;
