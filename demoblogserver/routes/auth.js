const express = require("express");
const router = express.Router();

const Auth = require("../functions/sqeuelize/index"); // Auth fonksiyonlarının dahil edilmesi

router.get("/", (req, res, next) => {
  res.render("index", { title: "Auth Page" });
});

/*  Kullanıcı Kayıt */

router.post("/register", (req, res, next) => {
  const { userName, fullName, email, password } = req.body;
  const Data = {
    userName,
    fullName,
    email,
    password
  };
  console.log("Data", Data);
  Auth.Register(Data)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/*  Kullanıcı Giriş */

router.post("/login", (req, res, next) => {
  const { userName, password, loginControl } = req.body;
  const Data = {
    userName,
    password,
    loginControl
  };
  Auth.Login(Data)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/*  Kullanıcı Şifre Hatırlatma */

router.post("/lostpassword", (req, res, next) => {
  const userName = req.body.userName;
  Auth.LostPassword(userName)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
