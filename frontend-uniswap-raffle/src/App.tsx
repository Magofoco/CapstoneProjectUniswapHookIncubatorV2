import { Grid } from "./components";
import { Page } from "./containers/Page";
import { Navbar } from "./controls/Navbar";
const VITE_INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;

console.log(VITE_INFURA_API_KEY);

export const App = () => {
  return (
    <Grid>
      <Navbar />
      <Page />
    </Grid>
  );
};
