import { Grid } from "./components";
import { Page } from "./containers/Page";
import { Navbar } from "./controls/Navbar";

export const App = () => {
  return (
    <Grid>
      <Navbar />
      <Page />
    </Grid>
  );
};
