import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, createStyles, Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => {
  return createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      },
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 13,
      paddingBottom: 11
    }
  });
});

const Header = (props: any) => {
  const classes = useStyles({});

  const handleClick = () => {
    props.history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <Link component="a" href={"/"} rel="noreferrer" variant="h5">
        <Button variant="outlined" color="primary">
          Home
        </Button>
      </Link>
      <Link component="a" href={"/signin"} rel="noreferrer" variant="h5">
        <Button variant="outlined" color="primary">
          Sign In
        </Button>
      </Link>
      <Link component="a" href={"/signup"} rel="noreferrer" variant="h5">
        <Button variant="outlined" color="primary">
          Sign Up
        </Button>
      </Link>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Home
      </Button>
    </div>
  );
};

export default withRouter(Header);
