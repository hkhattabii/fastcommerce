const devUrl = "postgresql://postgres:root@localhost:5432/postgres"
const testUrl = "postgresql://postgres:root@fastcommerce-db/test"
const prodUrl = "postgresql://postgres:root@fastcommerce-db/postgres"


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