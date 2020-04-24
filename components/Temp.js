import { Grid } from "semantic-ui-react";
import { useContext } from "react";
import { UnitContext } from "./providers/unit";

const Temp = ({ main: { temp, feels_like, temp_min, temp_max } }) => {
  const { conversionReducer, unitState } = useContext(UnitContext);
  const [convert] = conversionReducer;
  const [unit] = unitState;
  return (
    <Grid>
      <Grid.Row columns={4} divided>
        <Grid.Column>
          Temp: {convert(temp)}&deg;{unit}
        </Grid.Column>
        <Grid.Column>
          Feels like: {convert(feels_like)}&deg;{unit}
        </Grid.Column>
        <Grid.Column>
          Min: {convert(temp_min)}&deg;{unit}
        </Grid.Column>
        <Grid.Column>
          Max: {convert(temp_max)}&deg;{unit}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Temp;
