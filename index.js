import express from "express";

const app = express();
const port = 3000;

//middleware
app.use(express.json());

let teaData = [];
let nextId = 1;

//add new tea
app.post("/teas", (req,res) => {
  const { name, price } = req.body
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);

  res.status(201).send(newTea);
})
//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData)
})

//get tea with id tea
app.get("/teas/:id", (req,res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("error: Not Found")
  } 
  res.status(200).send(tea)
})

//update tea
app.put("/teas/:id", (req, res) => {
  let teaToUpdate = teaData.find((t) => t.id === parseInt(req.params.id))
  if (!teaToUpdate) {
    res.status(404).send("Error: tea not found")
  }
  const { name, price } = req.body
  teaToUpdate.name = name;
  teaToUpdate.price = price;
const updatedTea = teaToUpdate
  res.status(200).send(updatedTea)
})


//deletetea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id == parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea Not found");
  }
  teaData.splice(index, 1);

  // Reindex remaining elements by updating their `id`
  teaData.forEach((t, idx) => {
    t.id = idx + 1; // Assuming you want to reindex starting from 1
  });

  res.status(204).send("deleted");
})


 
app.listen(port, (req,res) => {
  console.log(`Server is running on port: ${port}`)
})