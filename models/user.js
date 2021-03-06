const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItems
  };

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(
    i => i.productId.toString() !== productId.toString()
  );

  this.cart.items = updatedCartItems;

  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };

  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");

// const ObjectId = mongodb.ObjectID;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();

//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems
//     };

//     const db = getDb();

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .find({ _id: new ObjectId(userId) })
//       .next();
//   }

//   getCart() {
//     const db = getDb();

//     const productIds = this.cart.items.map(i => i.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       i => i.productId.toString() !== productId.toString()
//     );

//     const db = getDb();

//     return db.collection("users").updateOne(
//       { _id: new ObjectId(this._id) },
//       {
//         $set: { cart: { items: updatedCartItems } }
//       }
//     );
//   }

//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then(products => {
//         console.log(products);

//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name,
//             email: this.email
//           }
//         };

//         db.collection("orders").insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };

//         return db.collection("users").updateOne(
//           { _id: new ObjectId(this._id) },
//           {
//             $set: { cart: { items: [] } }
//           }
//         );
//       });
//   }

//   getOrders() {
//     const db = getDb();

//     const productIds = this.cart.items.map(p => p.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         console.log(products);
//         //if product is deleted we remove it from cart
//         if (this.cart.items.length !== products.length) {
//           console.log("DELETE PRODUCTS also FROM CART");

//           const updatedCartItems = this.cart.items.filter(item => {
//             const existingProduct = products.find(
//               pr => pr._id.toString() === item.productId.toString()
//             );

//             return existingProduct && existingProduct._id;
//           });

//           db.collection("users").updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: updatedCartItems } } }
//           );
//         }

//         return products.map(pr => {
//           pr.quantity = this.cart.items.find(
//             item => item.productId.toString() === pr._id.toString()
//           ).quantity;

//           return pr;
//         });
//       });
//   }
// }
