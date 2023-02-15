import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './forgotpswd.module.css';
import { TextField, Button } from "@mui/material";

const Forgotpswd = () => {
  const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
    event.preventDefault();
    };
  <div className={styles.Forgotpswd} data-testid="Forgotpswd">
    
    Forgotpswd Component

    return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
  </div>
    
    };

Forgotpswd.propTypes = {};

Forgotpswd.defaultProps = {};

export default Forgotpswd;

/*
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Initiate password reset process
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ForgotPassword;
*/