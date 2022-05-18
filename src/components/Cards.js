import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { ClickableTile, Stack } from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import { Link } from "react-router-dom";
export const RecordCard = ({ name, ...rest }) => {
  return (
    <ClickableTile className="record--card" {...rest}>
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

export const ActionCard = ({ label, path, renderIcon, ...rest }) => {
  return (
    <Link to={path} className="action--card">
      <ClickableTile
        element={Link}
        to={path}
        className="action--card__content"
        {...rest}
      >
        {isValidElement(renderIcon) && renderIcon}
        <h4>{label}</h4>
        <ArrowRight size={24} className="action--card__icon" />
      </ClickableTile>
    </Link>
  );
};

RecordCard.propTypes = {
  name: PropTypes.string,
};
