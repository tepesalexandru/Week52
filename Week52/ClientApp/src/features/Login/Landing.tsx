import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectWithValidation from "../../shared/SelectWithValidation";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { getUsers } from "./userService";
import { useDispatch } from "react-redux";
import { setUser } from "../Weekly/Slices/metadataSlice";

interface Props {}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 42,
    marginBottom: 32,
    color: "white",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 16,
    color: "white",
  },
  confirm: {
    marginTop: 32,
  },
});

export default function Landing({}: Props): ReactElement {
  const classes = useStyles();
  const formHook = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers();
      setAllUsers(result);
    };
    fetchUsers();
  }, []);

  const handleSubmit = formHook.handleSubmit((data) => {
    dispatch(setUser({ userId: data.userId }));
    history.push("/week/overview");
  });

  return (
    <div className={classes.root}>
      <div className={classes.title}>Welcome to Week52</div>
      <div className={classes.subtitle}>Choose your user</div>

      <SelectWithValidation
        name="userId"
        label="user"
        formHook={formHook}
        values={allUsers}
        validation={{ required: true }}
      />
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          className={classes.confirm}
        >
          Confirm
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push("/create-user")}
          className={classes.confirm}
          style={{ marginLeft: 24 }}
        >
          Create User
        </Button>
      </div>
    </div>
  );
}
