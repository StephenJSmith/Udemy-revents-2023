import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppEvent } from "../../../app/types/event";
import {
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const EventForm = () => {
  const {loadDocument, create, update} = useFireStore('events');
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues:async () => {
      if (event) {
        return {...event, date: new Date(event.date)};
      }
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events?.data.find((e) => e.id === id)
  );
  const {status} = useAppSelector(state => state.events);

  useEffect(() => {
    if (!id) return;

    loadDocument(id, actions);
  }, [id, loadDocument]);

  const updateEvent = async (data: AppEvent) => {
    if (!event) return;

    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  };

  const createEvent = async (data: FieldValues) => {
    const ref = await create({
      ...data,
      hostedBy: "Bob",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    });

    return ref;
  };

  const handleCancelToggle = async (event: AppEvent) => {
    await update(event.id, {
      isCancelled: !event.isCancelled,
    });
    const cancelledStatus = event.isCancelled
      ? 'reactivated'
      : 'cancelled';
    toast.success(`Event has been ${cancelledStatus}`);
  }

  const onSubmit =  async (data: FieldValues) => {
    try {
      if (event) {
        await updateEvent({...event, ...data});
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message)
      console.log(error.message);
    }
  };

  if (status === 'loading') return <LoadingComponent />

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          placeholder="Event title"
          defaultValue={event?.title || ""}
          {...register("title", { required: true })}
          error={errors.title && "Title is required"}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          defaultValue={event?.category}
          render={({ field }) => (
            <Form.Select
              options={categoryOptions}
              placeholder="Category"
              clearable
              {...field}
              onChange={(_, d) =>
                setValue("category", d.value, { shouldValidate: true })
              }
              error={errors.category?.message}
            />
          )}
        />
        <Form.TextArea
          placeholder="Description"
          defaultValue={event?.description || ""}
          {...register("description", { required: "Description is required" })}
          error={errors.description?.message}
        />
        <Header sub content="Location details" color="teal" />
        <Form.Input
          placeholder="City"
          defaultValue={event?.city || ""}
          {...register("city", { required: "City is required" })}
          error={errors.city?.message}
        />
        <Form.Input
          placeholder="Venue"
          defaultValue={event?.venue || ""}
          {...register("venue", { required: "Venue is required" })}
          error={errors.venue?.message}
        />
        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="d MMM yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

        {event && 
          <Button
            type='button'
            floated='left'
            color={event.isCancelled ? 'green' : 'red'}
            onClick={() => handleCancelToggle(event)}
            content={event.isCancelled ? 'Reactivate event' : 'Cancel event'}
          />
        }

        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          disabled={isSubmitting}
          type="button"
          floated="right"
          content="Cancel"
          as={Link}
          to="/events"
        />
      </Form>
    </Segment>
  );
};
export default EventForm;
