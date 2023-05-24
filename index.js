const { PORT } = require("./config/config");
const { db } = require("./config/database");
const { server } = require("./server/index");

db.authenticate()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

