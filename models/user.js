const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  // addToCard(product) {
  //   //  B1: Find
  //   //  tìm cái Id đó có trùng với Id trong Data hay không --> trả về đối tượng product đó
  //   // cho newQuantity = 1 ;
  //   const cartProductIndex = this.cart.items.findIndex((cp) => {
  //     return cp.productId.toString() === product._id.toString();
  //   });

  //   let newQuantity = 1;
  //   const updatedCartItems = [...this.cart.items];
  //   // B2 : Cập Nhật
  //   // I>Nếu đã có đối tượng
  //   // 1.nếu mà đối tượng đó có thì : tăng quantity lên 1 ()
  //   // 2.cập nhật lại items
  //   // II> Nếu chưa có đối tượng
  //   // 1. Push > mới vào một đối tượng (Nhằm sau này để cập nhật lại)
  //   if (cartProductIndex >= 0) {
  //     newQuantity = this.cart.items[cartProductIndex].newQuantity + 1;
  //     updatedCartItems[cartProductIndex].quantity = newQuantity;
  //   } else {
  //     updatedCartItems.push({
  //       productId: new ObjectId(product._id),
  //       quantity: newQuantity,
  //     });
  //   }
  //   //  Tạo 1 object cart items
  //   const updatedCart = {items : updatedCartItems};
  //   // const updatedCart = { items: đối tượng trên II.1 };
  //   // xem tiếp ở 4.33

  //   // const updatedCart = { items: [{ ...product, quantity: 1 }] };
  //   const db = getDb();
  //   return db
  //     .collection("users")
  //     .updateOne(
  //       { _id: new ObjectId(this.id) },
  //       { $set: { cart: updatedCart } }
  //     )
  //     .then((result) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      )
      .then((result) => {})
      .catch((err) => {console.log(err)});
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
