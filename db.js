const { Pool } = require("pg");

const connectionString =
  "postgres://akcgkfrm:yZrhFLYqmFtgq3TTQ7Be-NrmXb6i9KoN@mouse.db.elephantsql.com/akcgkfrm";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
