import React from "react";
import Flatpickr from "react-flatpickr";
import { useController } from "react-hook-form";
import { TextInput } from "@carbon/react";

export const DatePicker = ({
  id,
  control,
  labelText,
  invalid,
  invalidText,
  ...rest
}) => {
  const {
    field: { value, onChange, ...otherFieldProps },
  } = useController({
    name: id,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  /*
   cds date input evt emits an array of dates in this case
   we only need 0

   @param event<array[string]>
  */
  function handleDateChange([date]) {
    onChange(date);
  }

  return (
    <Flatpickr
      {...rest}
      {...otherFieldProps}
      value={value}
      onChange={handleDateChange}
      options={{ maxDate: "today", dateFormat: "Y-m-d", defaultDate: null }}
      render={(props, ref) => {
        return (
          <TextInput
            type="date"
            id={id}
            ref={ref}
            aria-label="date"
            placeholder="yyyy-mm-dd"
            labelText={labelText}
            invalid={invalid}
            invalidText={invalidText}
          />
        );
      }}
    />
  );
};
