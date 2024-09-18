// Setup
const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Add support for incoming JSON entities
app.use(express.json());

// Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Add new applicant
app.post('/api/applicants', async (req, res) => {
  try {
    await dataService.AddNewEmployee(req.body); // Wait for the promise to resolve
  } catch (err) {
    res.status(500).json({ "message": "Server internal error" });
  }
});

// Get one
app.get("/api/employees/:id", async (req, res) => {
  console.log("hello");
  // // option 1 - without using Promise
  // let emp = dataService.getEmployeeById(req.params.id);
  // emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });

  // // option 2 - using Promise
  // dataService.getEmployeeById(req.params.id)
  // .then((emp) => {
  //   emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });
  // })
  // .catch((err) => {
  //   res.status(500).json({ "message": "Server internal error" });
  // });

  // option 3 - using await/async syntax (of Promise)
  try {
    let emp = await dataService.getEmployeeById(req.params.id);
    // emp ? res.json(emp) : res.status(404).json({ "message": "Resource not found" });
    res.json(emp) 
  }catch (err){
    res.status(500).json({ "message": "Server internal error" });
  }

});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send('Resource not found');
});

// Tell the app to start listening for requests
app.listen(HTTP_PORT, () => {
  console.log('Ready to handle requests on port ' + HTTP_PORT);
});
