import { AppEvent } from "../../../app/types/event"
import EventListItem from "./EventListItem"

type Props = {
  events: AppEvent[],
};

const EventList = ({events}: Props) => {
  return (
    <>
    {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  )
}
export default EventList