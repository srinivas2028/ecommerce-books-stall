const express = require("express")
const route = express()
const data = require("../models/mongo")
const cart=require("../models/cartdata")
const mongodb = require('mongodb');
const bodyPaser = require("body-parser")
const b = require("../controllers/controls")
route.get("/", (req, res) => {
  res.render("home")
})

route.get("/books", b.find_book);
route.get("/cart",b.display_cart)
route.get("/cart/:id",b.add_cart)
route.post("/", b.add_book)
route.get("/books/:id", b.previewing_info);

module.exports = route