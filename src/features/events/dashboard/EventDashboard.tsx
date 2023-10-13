import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../app/api/sampleData";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/event";

type Props = {
  formOpen: boolean,
  setFormOpen: (value: boolean) => void,
};

const EventDashboard = ({formOpen, setFormOpen}: Props) => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList events={events} />
      </GridColumn>
      <Grid.Column width={6}>
        {formOpen && 
        <EventForm setFormOpen={setFormOpen} />}
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard;