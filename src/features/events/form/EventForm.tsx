import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { createId } from "@paralleldrive/cuid2";
import { createEvent, updateEvent } from "../eventSlice";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const navigate = useNavigate();
  let { id } = useParams();
  const event = useAppSelector((state) =>
    state.events?.events.find((e) => e.id === id)
  );
  const dispatch = useAppDispatch();

  const onSubmit = (data: FieldValues) => {
    id = id ?? createId();

    event
      ? dispatch(updateEvent({...event, ...data, date: data.date.toString()}))
      : dispatch(createEvent({
        ...data,
        id,
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '',
        date: data.date.toString()
      }));

    navigate(`/events/${id}`);
  };

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
              onChange={(_, d) => setValue('category', d.value, {shouldValidate: true})}
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
            name='date'
            control={control}
            rules={{required: 'Date is required'}}
            defaultValue={event && new Date(event.date) || null}
            render={({field}) => (
              <DatePicker
                selected={field.value}
                onChange={value => setValue('date', value, {shouldValidate: true})}
                showTimeSelect
                timeCaption="time"
                dateFormat='d MMM yyyy h:mm aa'
                placeholderText="Event date and time"
              />
            )}
          />
        </Form.Field>

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
