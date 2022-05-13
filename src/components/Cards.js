import React from "react";
import PropTypes from "prop-types";
import { ClickableTile, Stack } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
export const RecordCard = ({ name }) => {
  return (
    <ClickableTile className="record--card">
      <Stack gap={4}>
        <small>ID 1024</small>
        <h3>{name}</h3>
        <p>Sex: F</p>
        <p>created: {new Date().toLocaleString()}</p>
        <p>Last updated: {new Date().toLocaleString()}</p>
        <ArrowRight size={20} className="record--card__icon" />
      </Stack>
    </ClickableTile>
  );
};

RecordCard.propTypes = {
  name: PropTypes.string,
};
