//renderingthe home
const home_page = (req, res) => {
  res.render("home")
}
const data = require("../models/mongo")


//finding of data in mangoes
const find_book = (req, res) => {
  data.datab.find()
    .then((books) => {
      res.render("book", { books });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error retrieving books");
    });
}
//addind new data
const add_book = (req, res) => {
  const book1 = new data.datab({
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    genre: req.body.genre,
    cost: req.body.cost,
    details: req.body.details
  })
  book1.save()

  res.render("home")
}
//redirecting to preview page depening one the id of the mongooes
const previewing_info = (req, res) => {
  let bookid = req.params.id
  console.log(req.params.id)
  bookid = bookid.trim()
  data.datab.findById(bookid)
    .then(result => {
      res.render("preview", { bookinfo: result })
    })
    .catch(err => {
      console.log(err)
    })


}


const display_cart = (req, res) => {
  data.cartbox.find()
    .then(cartdatabook => {
      
      res.render("cart", {cartdatabook  })
    })

}

const add_cart = async (req, res) => {
  try {
    const id = req.params.id;
    let counting = 1;
    let testcase = false;
    const bookinfo = await data.datab.findById(id);
    const cartItems = await data.cartbox.find().exec();

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].details.title === bookinfo.title) {
        testcase = true;
        cartItems[i].count++;
        await cartItems[i].save();
        break; // Exit the loop since the item is already in the cart
      }
    }

    if (!testcase) {
      const bookdetails = new data.cartbox({
        details: bookinfo,
        count: counting
      });
      await bookdetails.save();
    }

    const cartdatabook = await data.cartbox.find().exec();
    res.render("cart", { cartdatabook });

  } catch (err) {
    console.log(err);
    // Handle the error appropriately (e.g., send an error response)
  }
};



module.exports = {
  home_page, find_book, add_book, previewing_info, display_cart, add_cart
}