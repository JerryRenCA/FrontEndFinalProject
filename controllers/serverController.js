const { sequelize } = require("./dbController");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect to sqlite database in directory:/database");
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on PORT:${process.env.PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database", error);
    console.error("Server fail to start.");
  }
};

module.exports = { startServer };
