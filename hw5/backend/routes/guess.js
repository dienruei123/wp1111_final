import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router();
router.post("/start", (_, res) => {
  genNumber();
  res.json({ msg: "The game has started." });
  //   res.json({ msg: getNumber() });
});
router.get("/guess", (req, res) => {
  const number = getNumber();
  const guessNumber = parseInt(req.query.number);
  //   res.json({ msg: `${number}, ${guessNumber}` });
  if (isNaN(guessNumber) || guessNumber > 100 || guessNumber < 1) {
    res.status(406).json({
      msg: `Error: "${req.query.number}" is not a valid number (1 - 100)`,
    });
  } else if (guessNumber === number) {
    res.json({ msg: "Equal" });
  } else if (guessNumber <= number) {
    res.json({ msg: "Bigger" });
  } else if (guessNumber >= number) {
    res.json({ msg: "Smaller" });
  }
});
router.post("/restart", (_, res) => {
  genNumber();
  res.json({ msg: "The game has restarted." });
});
export default router;
