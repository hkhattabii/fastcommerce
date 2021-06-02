const devUrl = 'mongodb+srv://admin:admin@cluster0.jtn7h.mongodb.net/backup-db?authSource=admin&replicaSet=atlas-3yrs6h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const testUrl = 'mongodb+srv://admin:admin@cluster0.jtn7h.mongodb.net/backup-db-test?authSource=admin&replicaSet=atlas-3yrs6h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const prodUrl = 'mongodb://backup-db:27017'


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