import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import middy from "@middy/core";
import jsonBodyParser from '@middy/http-json-body-parser'

const addTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { title, description } = event.body
        const createdAt = new Date()
        const id = uuidv4()
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

export const handler = middy(addTask).use(jsonBodyParser());
