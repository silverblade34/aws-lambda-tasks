const { v4 } = require("uuid")
const AWS = require("aws-sdk")

const addTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { title, description, done } = JSON.parse(event.body)
        const createdAt = new Date()
        const id = v4()
        const newtask = { id, title, description, createdAt, done: false }
        await dynamodb.put({
            TableName: 'notificationsTable',
            Item: newtask
        }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(newtask)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        }
    }
}

module.exports = {
    addTask
}