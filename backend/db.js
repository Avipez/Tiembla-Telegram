const db = require("mongoose");

//if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:
//p%40ssw0rd%279%27%21

db.Promise = global.Promise;

async function connect(URL) {
  db.set("strictQuery", false);
  await db.connect(URL),
    {
      useNewUrlParser: true,
    };

  console.log("[db] Conectada con exito");
}

module.exports = connect;