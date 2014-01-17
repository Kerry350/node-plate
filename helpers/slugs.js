var Q = require('q');

module.exports = {
  slugify: function(toSlugify, existenceCheck) {
    var deferred = Q.defer();

    var slug = toSlugify
    .toLowerCase()
   .replace(/\s+/g, '-')        // Replace spaces with -
   .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
   .replace(/\-\-+/g, '-')      // Replace multiple - with single -
   .replace(/^-+/, '')           // Trim - from start of text
   .replace(/-+$/, '');         // Trim - from end of text

    var count = 0;

    // Recurse until we have found a unique slug
    var checkForExistence = function() {
      var slugToCheck = count === 0 ? slug : slug + '-' + count;

      existenceCheck(slugToCheck)
      .then(function(post) {
        if (post) {
          count++;
          checkForExistence();
        } else {
          deferred.resolve(slugToCheck);
        }
      });
    }

    checkForExistence();

    return deferred.promise;
  }
};