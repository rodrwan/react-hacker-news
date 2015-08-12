'use strict';

function $http(url) {
  // A small example of object
  var core = {
    // Method that performs the ajax request
    ajax: function (method, url, args) {
      // Creating a promise
      var promise = new Promise(function (resolve, reject) {
        // Instantiates the XMLHttpRequest
        var client;
        try {
            client = new XMLHttpRequest();
        } catch (tryMS) {
            try {
                client = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (otherMS) {
                try {
                    client = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    client = null;
                }
            }
        }
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status == 200) {
            // Performs the function "resolve" when this.status is equal to 200
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 200
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get': function(args) {
      return core.ajax('GET', url, args);
    },
    'post': function(args) {
      return core.ajax('POST', url, args);
    },
    'put': function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};

module.exports = $http;
