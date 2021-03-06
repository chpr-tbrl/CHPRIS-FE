import React from "react";
import { useController } from "react-hook-form";
import { TextInput } from "@carbon/react";

import Flatpickr from "react-flatpickr";

export const DatePicker = ({ id, control, ...rest }) => {
  const { field } = useController({
    name: id,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  return (
    <Flatpickr
      {...field}
      {...rest}
      options={{ maxDate: new Date() }}
      render={(props, ref) => {
        return (
          <TextInput id={id} {...props} ref={ref} placeholder="yyyy-mm-dd" />
        );
      }}
    />
  );
};
