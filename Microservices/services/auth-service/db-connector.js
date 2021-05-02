const devUrl = 'mongodb+srv://admin:admin@cluster0.jtn7h.mongodb.net/auth-db?authSource=admin&replicaSet=atlas-3yrs6h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const testUrl = 'mongodb+srv://admin:admin@cluster0.jtn7h.mongodb.net/auth-db-test?authSource=admin&replicaSet=atlas-3yrs6h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const prodUrl = 'mongodb://auth-db:27017'


function dbConnector(environment) {
    switch(environment) {
        case "development":
            return devUrl
        case "test":
            return testUrl
        case "production":
            return prodUrl
        default:
            return
    }
}

module.exports = dbConnector