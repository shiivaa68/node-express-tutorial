import { Sequelize } from "sequelize";

 const sequelize = new Sequelize({
  database: "lessons.db3",
  username: "root",
  password: "12345",
  host: "localhost",
  dialect: "sqlite", // Change to 'mysql' or 'sqlite'
  storage: "./data/mydatabase.sqlite",
  logging: false, // Set to true if you want SQL logs
});


export default sequelize;
// export const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Database connection successful!");
//   } catch (error) {
//     console.error("❌ Database connection failed:", error);
//   }
// };


