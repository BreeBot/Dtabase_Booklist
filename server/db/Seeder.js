import pg from 'pg'
const pool = new pg.Pool({connectionString:"postgres://postgres:password@localhost:5432/launch_digital_library_development"})

class Seeder {
  static async seed() {
    try {
      const result = await pool.query("SELECT * FROM books;")
      console.log(result.rows)
      pool.end()
    } catch (error) {
      pool.end()
    }
  }
}

export default Seeder