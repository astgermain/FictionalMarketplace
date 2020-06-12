module.exports = {
    apps : [{
      name        : "backend",
      script      : "./backend/server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
        CLIENT_ID:"Your id no quotes",
        CLIENT_SECRET:"Your secret w/ quotes",
        REDIRECT_URI:"Your uri w/ quotes",
        NONCE_SECRET:"secret w/ quotes",
        RANDOM_STRING_SIZE:"random generator number no quotes (10-20 suggested)",
        AUTH_SECRET:"auth secret w/ quotes" ,
      },
      env_production : {
       "NODE_ENV": "production"
      }
    },
    {
      name       : "frontend",
      script     : "./frontend/server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }]
  }