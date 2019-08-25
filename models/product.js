const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");

// const ObjectID = mongodb.ObjectID;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new ObjectID(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();

//     console.log(this);
//     let dbOp;
//     if (this._id) {
//       dbOp = db.collection("products").updateOne(
//         { _id: this._id },
//         {
//           $set: this
//         }
//       );
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }

//     return dbOp
//       .then(res => console.log("SUCCED"))
//       .catch(err => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         console.log("PRODUCTS LISTED");
//         return products;
//       })
//       .catch(err => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();

//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectID(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => console.log(err));
//   }

//   static deleteById(prodId) {
//     const db = getDb();

//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectID(prodId) })
//       .then(result => {
//         console.log("PRODUCT DELETED");
//       })
//       .catch(err => console.log(err));
//   }
// }

// module.exports = Product;
