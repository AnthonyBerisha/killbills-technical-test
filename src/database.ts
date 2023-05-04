import sqlite3 from "sqlite3";

class Database {
  private readonly db: sqlite3.Database;
  private readonly dbPath: string = "./database.sqlite";

  constructor() {
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err != null) {
        console.error(err.message);
        throw err;
      }
      console.log(`Connected to the database at ${this.dbPath}`);
    });
  }

  public async run(query: string, params: any[] = []): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err != null) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(
            `Query: ${query} ${params} executed successfully with ID ${this.lastID}`
          );
          resolve();
        }
      });
    });
  }

  public async all(query: string, params: any[] = []): Promise<any[]> {
    return await new Promise<any[]>((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err != null) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Query: ${query} ${params} returned ${rows.length} rows`);
          resolve(rows);
        }
      });
    });
  }

  public async get(query: string, params: any[] = []): Promise<any> {
    return await new Promise<any>((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err != null) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(`Query: ${query} ${params} returned 1 row`);
          resolve(row);
        }
      });
    });
  }

  public async create(tableName: string, data: any): Promise<any> {
    const keys = Object.keys(data);
    const values = keys.map((key) => data[key]);

    console.log(keys, values);
    const query = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${keys
      .map(() => "?")
      .join(", ")});`;

    return await new Promise((resolve, reject) => {
      this.db.run(query, values, function (err) {
        if (err != null) {
          reject(err);
        } else {
          const lastID = this.lastID;
          const selectQuery = `SELECT * FROM ${tableName} WHERE id = ?;`;

          this.get(selectQuery, [lastID], (err: unknown, row: unknown) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      });
    });
  }

  public close(): void {
    this.db.close((err) => {
      if (err != null) {
        console.error(err.message);
      }
      console.log("Closed the database connection");
    });
  }

  public async migrate(): Promise<void> {
    const tokens = `
        CREATE TABLE IF NOT EXISTS tokens (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_email TEXT NOT NULL,
          token TEXT NOT NULL,
          expires_at INTEGER NOT NULL
        )
      `;
    await this.run(tokens);
  }
}

export default Database;
