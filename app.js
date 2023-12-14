const express = require("express"); //可以require一個function回來
const app = express();

// middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("正在經過middleWare");
  next();
});

app.use((req, res, next) => {
  console.log("正在經過第二個MiddleWare！");
  console.log("------------------------------");
  next();
});

// HTTP request: GET, POST, PUT, PATCH
app.get("/", (req, res) => {
  res.send("今天天氣不錯喔");
});

app.get("/resume", (req, res) => {
  return res.sendFile(__dirname + "/resume.html");
  console.log("我不會被執行");
});

app.get("/YJ", (req, res) => {
  res.redirect("/example");
});

app.get("/fruit", (req, res) => {
  res.send("Welcome to my fruit page.");
});

app.get("/fruit/:someFruit", (req, res) => {
  res.send(`歡迎來到${req.params.someFruit}頁面`);
});

app.post("/formHandling", (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  console.log(email);
  res.send(`你的Email是${email}。`);
});

app.get("/example", (req, res) => {
  res.sendFile(__dirname + "/example.html");
});

app.get("/*", (req, res) => {
  res.status(404).send("404 not found."); // Method chaning, res.status() return res obj.
  // res.send("404 not found.");
});

// port, callback
app.listen(3000, () => {
  console.log("Server is running on port:3000...");
});
