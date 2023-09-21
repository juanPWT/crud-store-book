const response = require("../response");
const db = require("../config/database.js");
const upload = require("../middleware/uploadCover.js");

const getAllBooks = (req, res) => {
  const sql = "SELECT * FROM book";
  db.query(sql, (err, result) => {
    if (err) {
      return response(500, null, "failed get data", res);
    }

    const result2 = result.map((data) => {
      if (data.cover) {
        //make a url or cover image
        data.coverURL = `http://localhost:3001/img/cover/${data.cover}`;
      }
      return data;
    });
    response(200, result2, "success get data", res);
  });
};

const getAllBooksById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM book WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) return response(500, null, "failed get data", res);

    const result2 = result.map((data) => {
      if (data.cover) {
        //make a url or cover image
        data.coverURL = `http://localhost:3001/img/cover/${data.cover}`;
      }
      return data;
    });

    response(200, result2, "success get data", res);
  });
};

const createBooks = (req, res) => {
  upload(req, res, (err) => {
    if (err) return response(500, "failed server", "failed upload cover", res);
    const { no_resi, title, description } = req.body;
    const cover = req.file ? req.file.filename : "no image";
    const sql = `INSERT INTO book (no_resi, title, description, cover) VALUES ('${no_resi}', '${title}', '${description}', '${cover}')`;

    db.query(sql, (err, result) => {
      if (err) return response(500, "server error", "failed post data", res);

      const response2 = {
        status: "success",
        affectedRows: result.affectedRows,
        insertId: result.insertId,
      };

      response(200, response2, " success post data", res);
    });
  });
};

const deleteBooks = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM book WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      return response(500, "failed", "failed delete data", res);
    }
    response(200, result, "success delete data", res);
  });
};

const updateBooks = (req, res) => {
  upload(req, res, (err) => {
    if (err) return response(500, "failed server", "cant update cover", res);
    const { id } = req.params;
    const { title, description } = req.body;
    const cover = req.file ? req.file.filename : "no image";
    const sql = `UPDATE book SET title = '${title}', description= '${description}', cover= '${cover}'  WHERE id = ${id} `;

    db.query(sql, (err, result) => {
      if (err) {
        return response(500, "failed", "failed update data", res);
      }
      const response2 = {
        status: "success",
        affectedRows: result.affectedRows,
        info: result.info,
      };
      response(200, response2, "success update data", res);
    });
  });
};

module.exports = {
  getAllBooks,
  getAllBooksById,
  createBooks,
  deleteBooks,
  updateBooks,
};
