import React from "react";
import { Card, CardContent, Button, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 400,
    margin: "auto",
    marginTop: 20,
    textAlign: "left",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: 8, // Adjust the margin here as needed
  },
  cancelButtonWrapper: {
    marginTop: 24, // Adjust the marginTop value to move the cancel button down
  },
}));

const Edit = ({ onCancel }) => {
  const classes = useStyles();

  const handleModifyPassword = () => {
    // Logic to handle modify password
  };

  const handleModifyEmail = () => {
    // Logic to handle modify email
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel function passed from the parent component
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              className={classes.button}
              onClick={handleModifyPassword}
            >
              Modify Password
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              className={classes.button}
              onClick={handleModifyEmail}
            >
              Modify Email Address
            </Button>
          </Grid>
        </Grid>
        <div className={classes.cancelButtonWrapper}>
          <Button variant="contained" color="primary" onClick={handleCancel}>
            Cancel
          </Button>{" "}
          {/* Cancel button */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Edit;
