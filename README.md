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

Use config.json con configure server, port, database configuration and passwords for jwt and bcrypt.

To access home route, need to pass "gettoken" key with value "true" in /login once created a successfull registration.

Then pass it into headers as Authorization key with token value.
