import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider , createGenerateClassName } from "@material-ui/styles";
import preset from 'jss-preset-default';

// Configure JSS
const jss = create({ plugins: [...preset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

// Custom Material-UI class name generator.

function RTL(props) {
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}  >
      {props.children}
    </StylesProvider >
  );
}

export default RTL;
