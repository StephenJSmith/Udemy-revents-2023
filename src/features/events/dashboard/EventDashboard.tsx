import { Grid, GridColumn } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../app/api/sampleData";
import { useEffect, useState } from "react";
import { AppEvent } from "../../../app/types/event";

type Props = {
  formOpen: boolean;
  selectedEvent: AppEvent | null;
  setFormOpen: (value: boolean) => void;
  selectEvent: (event: AppEvent | null) => void;
};

const EventDashboard = ({formOpen, selectedEvent, setFormOpen, selectEvent}: Props) => {
  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setEvents(sampleData);
  }, []);

  const addEvent = (event: AppEvent) => {
    setEvents(prevState => {
      return [...prevState, event];
    });
  }

  const updateEvent = (updatedEvent: AppEvent) => {
    setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
    selectEvent(null);
    setFormOpen(false);
  }

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(evt => evt.id !== eventId));
  }

  return (
    <Grid>
      <GridColumn width={10}>
        <EventList 
          events={events} 
          selectEvent={selectEvent} 
          deleteEvent={deleteEvent}
        />
      </GridColumn>
      <Grid.Column width={6}>
        {formOpen && 
        <EventForm 
          setFormOpen={setFormOpen} 
          updateEvent={updateEvent}
          addEvent={addEvent} 
          selectedEvent={selectedEvent}
          key={selectedEvent ? selectedEvent.id : 'created'}
        />}
      </Grid.Column>
    </Grid>
  )
}
export default EventDashboard;