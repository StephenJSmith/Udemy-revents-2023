import { useState } from "react";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import { NavBar } from "./nav/NavBar";
import { Container } from "semantic-ui-react";
import { AppEvent } from "../types/event";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  const handleSelectEvent = (event: AppEvent | null) => {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  const handleCreateFormOpen = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashboard 
          formOpen={formOpen} 
          setFormOpen={setFormOpen} 
          selectedEvent={selectedEvent}
          selectEvent={handleSelectEvent}
        />
      </Container>
    </>
  );
}

export default App;
