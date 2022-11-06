import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const deleteDB = async () => {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database cleared");
  } catch (e) {
    console.log(e);
    throw new Error("Database deletion failed");
  }
};
const saveUser = async (name, subject, score) => {
  let msg = "";
  const existing = await ScoreCard.findOne({ name, subject });
  //   console.log(existing);
  try {
    if (existing) {
      msg = "Updating";
      existing.score = score;
    } else msg = "Adding";
    const newUser = existing
      ? existing
      : new ScoreCard({ name, subject, score });
    newUser.save();
    console.log(`${msg} User: `, newUser);
    return [
      `${msg} (${newUser.name}, ${newUser.subject}, ${newUser.score})`,
      newUser,
    ];
  } catch (e) {
    throw new Error("User creation error: " + e);
  }
};
const queryUser = async (type, queryString) => {
  let msg = "",
    msgs = [];
  try {
    if (type === "name") {
      const existing = await ScoreCard.find({ name: queryString });
      if (!existing.length) {
        msg = `Name (${queryString}) not found!`;
        return [msgs, msg];
      }
      // console.log(existing);
      // for (let i = 0; i < existing.length; i++) {
      //   msgs.push(
      //     `Found card with name: (${existing[i].name}, ${existing[i].subject}, ${existing[i].score})`
      //   );
      // }
      return [existing, msg];
    } else if (type === "subject") {
      const existing = await ScoreCard.find({ subject: queryString });
      if (!existing.length) {
        msg = `Subject (${queryString}) not found!`;
        return [msgs, msg];
      }
      // for (let i = 0; i < existing.length; i++) {
      //   msgs.push(
      //     `Found card with subject: (${existing[i].name}, ${existing[i].subject}, ${existing[i].score})`
      //   );
      // }
      return [existing, msg];
    } else throw new Error(`Query type ${type} does not exist.`);
  } catch (e) {
    throw new Error("Query error: " + e);
  }
};

const router = Router();
router.delete("/cards", async (req, res) => {
  // console.log(res);
  await deleteDB();
  res.json({ message: "Database cleared" });
});
router.post("/card", async (req, res) => {
  const data = req.body;
  const [s, card] = await saveUser(data.name, data.subject, data.score);
  res.json({ message: s, card: card });
});
router.get("/cards", async (req, res) => {
  //   console.log(req.query);
  const qry = req.query;
  let [messages, message] = await queryUser(qry.type, qry.queryString);
  if (!messages.length) messages = null;
  //   console.log(`messages: ${messages}, message: ${message}`);

  res.json({ messages: messages, message: message });
});
export default router;
