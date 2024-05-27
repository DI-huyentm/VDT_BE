const { Sequelize, DataTypes, Model, QueryTypes, Op } = require("sequelize");
const sequelize = new Sequelize("vdt", "root", "tranminhhuyen123@", {
  host: "mysql",
  // host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Connecting to MySQL Database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.QueryTypes = QueryTypes;
db.Op = Op;

// Include Models

// db.User = require("./userModel")(sequelize, DataTypes, Model);
// db.Book = require("./bookModel")(sequelize, DataTypes, Model);
// db.Sale = require("./saleModel")(sequelize, DataTypes, Model);
// db.SaleDetail = require("./saledetailModel")(sequelize, DataTypes, Model);
// db.Genre = require("./genreModel")(sequelize, DataTypes, Model);
// db.BookGenre = require("./bookgenreModel")(sequelize, DataTypes, Model);
db.Student = require("./studentModel")(sequelize, DataTypes, Model);



// // Define the relations between many models

// db.SaleDetail.belongsTo(db.Sale, {
//   foreignKey: "sale_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// db.SaleDetail.belongsTo(db.Book, {
//   foreignKey: "book_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// db.Sale.belongsTo(db.User, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// db.BookGenre.belongsTo(db.Book, {
//   foreignKey: "book_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// db.BookGenre.belongsTo(db.Genre, {
//   foreignKey: "genre_id",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });

// db.Book.hasMany(db.BookGenre, {
//   foreignKey: "book_id",
// });

// db.Genre.hasMany(db.BookGenre, {
//   foreignKey: "genre_id",
// });

db.sequelize.sync();

module.exports = db;
