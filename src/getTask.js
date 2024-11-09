const AWS = require("aws-sdk")

const getTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.scan({
            TableName: 'notificationsTable'
        }).promise();
        const tasks = result.Items;
        return {
            statusCode: 200,
            body: JSON.stringify(tasks)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        }
    }
}

module.exports = {
    getTask
}