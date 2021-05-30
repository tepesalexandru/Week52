import React, { ReactElement } from "react";
import { useStyles } from "./Styles/AccordionStyles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Badge } from "@material-ui/core";

interface Props {
  renderSummary: Function;
  renderDetails: Function;
  badgeValue?: number;
}

export default function CustomAccordion(props: Props): ReactElement {
  const classes = useStyles();
  return (
    <Accordion style={{ boxShadow: "none" }}>
      <Badge
        color="primary"
        badgeContent={props.badgeValue || 0}
        style={{ width: "100%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        showZero={false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          classes={{ root: classes.summary, expandIcon: classes.expandIcon, content: classes.content}}
        >
          <Typography className={classes.heading}>
            {props.renderSummary()}
          </Typography>
        </AccordionSummary>
      </Badge>
      <AccordionDetails classes={{ root: classes.details }}>
        {props.renderDetails()}
      </AccordionDetails>
    </Accordion>
  );
}
