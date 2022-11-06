import { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import { useStyles } from "../hooks";
import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";
import { Typography } from "@material-ui/core";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState("name");
  const [queryString, setQueryString] = useState("");

  const [showOps, setShowOps] = useState("Add");

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleTabs = (event, newOps) => {
    setShowOps(newOps);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post("/card", {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else {
      let msg = [addCardMessage(message)];
      const {
        data: { messages, message_ },
      } = await axios.get("/cards", {
        params: {
          type: "name",
          queryString: name,
        },
      });
      msg.push(queryTable(messages));
      addRegularMessage(msg);
    }
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get("/cards", {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage(message);
    else {
      let msg = [
        <Typography variant="body2">
          Query Results for {queryType} ({queryString}):
        </Typography>,
      ];
      msg.push([queryTable(messages)]);
      addRegularMessage(msg);
    }
  };

  const queryTable = (queryList) => {
    return (
      <Table style={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queryList.map((row) => (
            <TableRow
              style={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.subject}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Wrapper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={showOps} onChange={handleTabs} variant="fullWidth">
          <Tab
            label="Add Data"
            value={"Add"}
            style={{ textTransform: "none", fontSize: "16px" }}
          />
          <Tab
            label="Query Data"
            value={"Query"}
            style={{ textTransform: "none", fontSize: "16px" }}
          />
        </Tabs>
      </Box>

      <Row
        style={{
          display: showOps === "Add" ? "flex" : "none",
          width: "800px",
          height: "100px",
        }}
      >
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row
        style={{
          display: showOps === "Query" ? "flex" : "none",
          width: "800px",
          height: "100px",
        }}
      >
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) =>
          // <Typography variant="body2" key={m + i}>
          //   {m}
          // </Typography>
          {
            return m;
          }
        )}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
