import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@carbon/react";

export const PageHeader = ({ title, description }) => {
  return (
    <header className="page--header">
      <Stack gap={5}>
        <h1>{title}</h1>
        <p>{description}</p>
      </Stack>
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
};
