const express = require("express");
const app = express();
const PORT = 3000;


app.use(express.json());

let items = [
  { id: 1, task: "Learn backend basics" },
  { id: 2, task: "Build REST API" }
];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, task: req.body.task };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.task = req.body.task;
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
