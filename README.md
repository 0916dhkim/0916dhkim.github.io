# Blog Monorepo

## Setup

1. Install dependencies.
   ```sh
   yarn
   ```
1. Setup environment variables.
1. Start PostgreSQL database.
   ```sh
   docker run -it --rm -p 5432:5432 -e POSTGRES_DB=<dbname> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> postgres -c log_statement=all
   ```

## How to Run

After setup,

- Start editor app (with fast refresh).
  ```sh
  yarn nx serve editor
  ```
- Start blog (with fast refresh).
  ```sh
  yarn nx serve blog
  ```

## How to Export Blog Pages

After setup,

```sh
yarn nx export blog
```
