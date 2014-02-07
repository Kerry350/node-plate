node-plate
==========

Boilerplate. For Node.js projects.

I start a fair few Node.js projects, and the boilerplate stage is always annoying. Don't get me wrong, tools like Yeoman, npm, Bower, Grunt et al alleviate a lot of this. But this boilerplate was more for quite specific things I use over and over - like Passport.js method set up, or reusable components like image uploading. It's probably not something others will find that useful, as it's quite specific to my needs / tastes. 

# Routing 

## Router

A little router I built. It expects to be handed a routes file of some description. 

## Routes

This router implementation allows the use of 'route groups', and `this` refers to the router instance. 

It allows route setup like this:

```
this.get('/route', fn);

// This one would route to /api/v1/users
this.routeGroup('/api/v1/', function(group) {
  group.get('users', fn);
});    
```

Route groups can be infinitely nested. 

# Helpers 

## Slugs 

Contains a `slugify` function to allow the conversion of titles, names etc to slugs. 

```
slugify('Sexy title', fn)
.then(function(slug) {
  console.log(slug); // sexy-title
});
```

`fn` is just expected to be a function that can be called (and that returns a promise) to see if an item with that slug already exists. It'll recursively call this function, adding a counter on the end of the slug, until a unique one is found.

## Uploads 

Currently has a function for uploading to the filesystem. Although this really needs to be updated to not use Express' Multipart middleware. 

# Middleware 

Has some basic Express middleware setup, and some authentication setup that uses Passport.js. 






