import pg from "pg"
import _ from "lodash"

//OMG finally! This was tough!!! Many gremlins to fight off

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/launch_digital_library_development"
})

class Book {
  constructor({ id, title, author,page_count, description, fiction }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.page_count = page_count;
    this.description = description;
    this.fiction = fiction;
  }

  static async findAll() {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM books;");

      //get the results
      // console.log(result.rows);
      const bookData = result.rows;
      const books = bookData.map((book) => {
        // console.log(book)
        return new this(book);
      });
      //release the connection back to the pool
      client.release();
      return books;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async findById(id) {
    try {
      const client = await pool.connect()
      const query = "SELECT * FROM books WHERE id = $1"
      const result = await client.query(query, [id])
      const bookData = result.rows[0]
      const book = new this(bookData)
      
      client.release()
      return book
      
    } catch (err) {
      console.log(err);
      throw(err);
    }
  }

  async save() {
    try {
      const client = await pool.connect();

      let query =
        "INSERT INTO books (title, author, page_count, description, fiction) VALUES ($1, $2, $3, $4, $5)";
      await client.query(query, [
       this.title,
       this.author,
       this.page_count,
       this.description,
       this.fiction,
    ]);
      const result = await client.query("SELECT * FROM books ORDER BY ID DESC LIMIT 1");
      const newBookData = result.rows[0];
      this.id = newBookData.id;

    //release the connection back to the pool
    client.release();
    return true;

    } catch (err) {
      console.log(err);
      throw(err);
    }
  }
}

export default Book