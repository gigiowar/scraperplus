# Web Scraper API for plus size clothes

## Requirements
- NodeJs
- Docker

## Usage
- Access the root folder from project
- `docker-compose up -d` to run the project
- Inside api folder
- `./node_modules/.bin/sequelize db:migrate` to create the tables
- `./node_modules/.bin/sequelize db:seed:all` to create the categories
- `node scripts/scraper.js` to run the scraper

- Use a REST Client to make the requests. I like to use Postman (https://www.getpostman.com/)

## Endpoints
- (GET) http://localhost:3000/api/products?page=1

- (GET) http://localhost:3000/api/categories
- (GET) http://localhost:3000/api/categories/:category_id
- (POST) http://localhost:3000/api/categories
  - Body:
    ```json
    {
      "name": "blusas"
    }
    ```
- (PUT) http://localhost:3000/api/categories/:category_id
- (DELETE) http://localhost:3000/api/categories/:category_id

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

## TODO

- Authentication
- Improve scraper script to get from categories
- Tests