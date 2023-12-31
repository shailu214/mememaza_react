// pm2 needs to be installed globally on the server

module.exports = {
    apps: [
      {
        name: 'Santrash UI',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        env_production: {
          APP_ENV: 'prod' // APP_ENV=prod
        }
      }
    ]
  }