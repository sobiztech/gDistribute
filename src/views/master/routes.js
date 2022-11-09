import React from "react";
import PropTypes from "prop-types";
import { Routes } from "../../components";

const Masterroutes = ({ routes }) => {
  return <Routes routes={routes} />;
};

export default Masterroutes;

Masterroutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};
