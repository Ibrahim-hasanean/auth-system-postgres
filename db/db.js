const pg = require("pg");
const Pool = pg.Pool;
const bcrypt = require("bcrypt");
const moment = require("moment");
const pool = new Pool({
  database: "hndwlgwf",
  user: "hndwlgwf",
  host: "isilo.db.elephantsql.com",
  port: "5432",
  password: "71PkG8Zq1H86Hxgbn2tBq8bma0hRmoKh"
});

module.exports = {
  createUser: (email, password, name) => {
    let signup_date = moment().format("DD-MM-YYYY");
    let signup_time = moment().format("LTS");
    password = bcrypt.hashSync(password, 10);
    return pool
      .query(
        "INSERT INTO users (name,email ,password,is_verified,signup_date,signup_time) VALUES ($1,$2,$3,$4,$5,$6)",
        [name, email, password, false, signup_date, signup_time]
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        //console.log(err);
        throw new Error(err.message);
      });
  },
  getUserById: id => {
    return pool
      .query("SELECT * FROM users WHERE id = $1", [id])
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  getUser: email => {
    return pool
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  getUsers: () => {
    return pool
      .query("SELECT * FROM users")
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  addCode: (email, code) => {
    pool
      .query("UPDATE users SET verification_code=$1 WHERE email = $2", [
        code,
        email
      ])
      .then(result => {
        return result.rows;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  deleteUser: id => {
    pool
      .query("DELETE FROM users WHERE id = $1", [id])
      .then(result => {
        return result.rows;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  createFcUser: async (email, name, facebookid) => {
    return pool
      .query(
        "INSERT INTO users (name,email ,fb_id , is_verified) VALUES ($1,$2,$3,$4)",
        [name, email, facebookid, true]
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        //console.log(err);
        throw new Error(err.message);
      });
  },
  createGoogleUser: async (email, name, googleid) => {
    return pool
      .query(
        "INSERT INTO users (name,email ,google_id , is_verified) VALUES ($1,$2,$3,$4)",
        [name, email, googleid, true]
      )
      .then(result => {
        return result;
      })
      .catch(err => {
        //console.log(err);
        throw new Error(err.message);
      });
  },
  trueVerified: id => {
    pool
      .query("UPDATE users SET is_verified = $1  WHERE id = $2", [true, id])
      .then(result => {
        return "update succes";
      })
      .catch(err => {
        throw new Error(err.message);
      });
  },
  newPassword: async (email, password) => {
    let newPassword = bcrypt.hashSync(password, 12);
    console.log(password);
    pool
      .query("UPDATE users SET password = $1  WHERE email = $2", [
        newPassword,
        email
      ])
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err.message);
      });
  }
};
