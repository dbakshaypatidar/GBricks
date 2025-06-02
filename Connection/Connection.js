const Express = require("express");
const E = Express();
const corsorigine = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // only for local testing
E.use(Express.json());
E.use(corsorigine({ origin: "*", methods: "POST,GET" }));

mongoose.connect(process.env.MONGO_URL).then(() => {});

const Item = new mongoose.Schema({
  Price: { type: Number },
  share: { type: Number },
  Issues: { type: Number },
  Number: { type: Number },
  purchase: { type: Number },
  Lot: { type: Number },
});

const Items = new mongoose.model("Item", Item);

E.post("/Form", async (req, res) => {
  let { Price, share, Issues } = await req.body;

  const filter = { _id: "683af365ba0af938e88cd9da" };

  let update = { $set: { Price: Price, share: share, Issues: Issues } };

  const updatedDoc = await Items.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.json({ msg: "success" });
});

E.post("/Users", async (req, res) => {
  let { purchase, Lot } = await req.body;
  const filter = { _id: "683af365ba0af938e88cd9da" };
  let update = { $set: { purchase: purchase, Lot: Lot } };

  const updatedDoc = await Items.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.json({ msg: "success" });
});

E.get("/", async (req, res) => {
  let c = await Items.find({});

  res.json({ msg: "success", c });
});

E.listen(2000, () => {});
