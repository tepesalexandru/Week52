import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@material-ui/core";
import MaterialTooltip from '@material-ui/core/Tooltip';
import React, { ReactElement } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TimelineIcon from "@material-ui/icons/Timeline";

interface Props {
  totalMinutes: number;
  remainingByDay: number[];
}

export default function Burndown(props: Props): ReactElement {
  const [open, setOpen] = React.useState(false);
  const getData = (): any[] => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map((day: number) => {
      return {
        name: `Day ${day}`,
        remaining: props.remainingByDay[day],
        optimal: (props.totalMinutes - (props.totalMinutes / 7) * day).toFixed(
          0
        ),
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <div
        style={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleClickOpen}
      >
        <MaterialTooltip title="Burndown">
          <Fab color="primary" aria-label="add">
            <TimelineIcon />
          </Fab>
        </MaterialTooltip>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">{`Burndown Trend`}</DialogTitle>
        <DialogContent style={{ padding: 36, overflow: "hidden" }}>
          <DialogContentText id="alert-dialog-description">
            <ComposedChart
              width={730}
              height={250}
              data={getData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#bb86fc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#bb86fc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis>
                <Label
                  value="Remaining"
                  fill="rgb(102, 102, 102)"
                  textAnchor="middle"
                  fontSize="80%"
                  position="insideLeft"
                  angle={-90}
                />
              </YAxis>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="remaining"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Line type="monotone" dataKey="optimal" stroke="#2C4251" />
            </ComposedChart>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
