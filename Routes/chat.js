const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
router.get("/", (req, res) => {
  res.send(`<h1>Welcome to chat app</h1>`);
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../template/login.html"));
});

router.use("/msg", (req, res) => {
  const content = fs.readFileSync("chattext.text", "utf-8");
  res.statusCode = 200;
  res.send(`<h1>our chat</h1> <h4>${content}</h4> <form  action="/inbox" method="POST" onsubmit=" (document.getElementById('username').value)=localStorage.getItem('username')" > 
     <input type="text" name="msg"/>
     <input  style="display: none" type="text" id="username" name="username"/>
     <button type="submit">send</button>
 </form>`);
});


router.post("/inbox", (req, res) => {
    console.log(req.body)
  const text = req.body.msg;
  const username=req.body.username;

  

  fs.appendFile("chattext.text", `${username}: ${text} "  "`, (err) => {
    if (err) {
      res.status(404).send(`<h1>${err}</h1>`);
    } else {
      res.status(200);
      res.redirect("/msg");
    }
  });
});

module.exports = router;
