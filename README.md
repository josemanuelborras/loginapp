# loginapp
Login API with Node.js

LOGIN APP:

It's a login api created with Node.js, Express and MongoDB, ready to apply to any front-end framework.

LIBRERIES:

• Express

• Ready to run with Nodemon

• Moment

• Uses jwt-simple for token creation

• Uses bcrypt-nodejs for password hash

FEATURES:

Use .env to configure server, port, database configuration and passwords for jwt and bcrypt.

eg:
SERVER_URL=localhost
SERVER_PORT=8000

DATABASE_URL=mongodb://localhost
DATABASE_PORT=27017
DATABASE_NAME=login

PASS=pass

To access home route, need to pass "gettoken" key with value "true" in /login once created a successfull registration.
Then pass it into headers as Authorization key with token value.