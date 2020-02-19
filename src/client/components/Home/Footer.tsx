import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Text } from "../Ui/Text/index";

const useStyles = makeStyles(({ palette }) => {
  return createStyles({
    footer: {},
    footerHeading: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1.02,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20
    },
    footerParagraph: {
      fontSize: 12,
      marginBottom: 10,
      lineHeight: 1.2,
      textAlign: "justify",
      marginLeft: 10,
      marginRight: 10
    }
  });
});

const Footer = () => {
  const classes = useStyles({});

  return (
    <footer className={classes.footer}>
      <Text>Footer</Text>
    </footer>
  );
};

export default Footer;
