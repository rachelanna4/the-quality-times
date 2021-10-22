# The Quality Times News API

[Click here to access the API](https://the-quality-times.herokuapp.com/api).

[Click here to access the hosted website](https://the-quality-times.netlify.app/).

## Background

I built 'The Quality Times' API during my time on the Northcoders software development bootcamp course.

Its purpose is to be an interactive API, built in JavaScript, that serves up a variety of news articles and supports various features such as, allowing users to filter news by topic, to search for specific articles, and to post, update, and delete comments.

I have also built and hosted the frontend website that interacts with this API and this can be viewed using the links above.

## Local Development Setup

The guide below will give you all the setup information you need to view this project 'behind the scenes' and, should you wish to, will enable you to make your own contributions.

### Pre-requisites

- Install Node.js which acts as the runtime environment for this project. This should also install npm to manage all of the  
   required dependencies.

  [Follow this link to download Node.js with npm](https://nodejs.org/en/download/current/).

  Minimum version recommended: Node v16.8.0

- Install PostgreSQL which is used as the database server for this project.

  [Follow this link to download PostgreSQL](https://www.postgresql.org/download/).

  Minimum version recommended: PostgreSQL v13.4

### Clone Repository

To clone the repository for access on your local machine, run the following command in your terminal:

`git clone https://github.com/rachelanna4/the-quality-times.git`

### Install Dependencies

Navigate to the folder to which the repository was cloned and run the following command in your terminal:

`npm install`

This will install all necessary dependencies used in the project, such as Express which provides the server and Jest which is used for testing.

### Configure Environment

To configure the development and test environments, create the following two files with the specified content:

```
# filename: .env.development
PGDATABASE=the_quality_times
```

```
# filename: .env.test
PGDATABASE=the_quality_times_test
```

Double-check that these two files will be git ignored by navigating to the `.gitignore` file and ensuring that `.env.*` is listed.

### Setup Databases

To create the Postgres databases for both the tests and for the local server, run the following command in your terminal:

`npm run setup-dbs`

To seed the local server database, run the following command in your terminal:

`npm run seed`

The test database does not need to be seeded manually as it is seeded before every test is run.

### Run Tests

To run all test suites, run the following command in your terminal:

`npm test`

### Run Local Server

To run the server on your local machine, run the following command in the terminal:

`npm run start`

You should see a message in the console that tells you the app is listening on port 9090.

When running this command, the API should also be locally accessible through this link:

[Click here to access the local API](http://localhost:9090/api).
