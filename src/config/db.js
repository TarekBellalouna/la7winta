const mongoose = require("mongoose");

exports.makeDb = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    "mongodb+srv://tarekbella:tarekbella@la7wintadb.kd4w4.mongodb.net/la7winta?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  mongoose.set("useFindAndModify", false);
};