module.exports = {
  development: {
    port: process.env.PORT || 5050,
    dbPath: 'mongodb://localhost/Book-Library'
  },
  production: {}
}