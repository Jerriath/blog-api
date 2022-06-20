# Blog Api

This application is created with Nodejs using Express and Mongoose. The purpose of this application is to create a RESTful api to serve data to a frontend blog application.

# Authorization

Some routes in this api are protected by passport middleware. This middleware uses jwt authentification by receiving a bearer token from the frontend. This token is generated and sent to the blog cms when the user signs in. This allows users to have authorization without having to store a session on the backend. This is not necessarily needed since there will only be a one, or potentially at most a few, users that will be using the api at a time. Employing the use of jwt is primarily for understanding how this passport strategy works and how to utilize it.

# Routes

The routes are split to three categories and conglomerated into a single api route that gets exported and used as router middleware. This makes it easier to create more routes and scale easier. 

## User Routes

There are two routes for the user router. One of which is a sign up route to actually create an authorized user. This route is not available on the blog cms or the blog client. The only way to ping this route is by using curl or postman. This was done because I, the owner, am the only user allowed since this a personal blog. The other route is the sign in route to get an authorized jwt in order to perform admin related requests. Users are also protected via bcrypt to hash passwords. The secret key will be stored in the deployment service.

## Post Routes

The post router is the most involved router. It includes all CRUD operations for interacting with the posts collection in the database. The most important part these routes (in the CMS) is the passport middleware for jwt authorization. The create, update, and delete routes are all protected with the jwt authorization in the backend api.

## Comment Routes

Comments are a lot more simple to deal with. The only jwt protected route is the delete route. Anyone using the blog client can create comments and get comments, but only an authorized user can delete comments.

