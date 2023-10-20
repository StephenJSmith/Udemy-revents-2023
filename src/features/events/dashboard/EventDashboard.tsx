import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { actions } from "../eventSlice";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";

const EventDashboard = () => {
  const {data: events, status} = useAppSelector(state => state.events);
  const {loadCollection} = useFireStore('events');

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  if (status === 'loading') return <LoadingComponent />

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard;