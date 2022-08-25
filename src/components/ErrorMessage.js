import React from "react";
import PropTypes from "prop-types";

export const ErrorMessage = ({ message, id }) => {
  return (
    <small class="error--message" id={id}>
      {message || "Field is required"}
    </small>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string.isRequired,
};
