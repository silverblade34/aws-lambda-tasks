import AWS from "aws-sdk";

export const updateTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const { done, title, description } = JSON.parse(event.body)

        await dynamodb.update({ TableName: 'notificationsTable', Key: { id }, UpdateExpression: 'set done = :done, title = :title, description = :description', ExpressionAttributeValues: { ':done': done, ':title': title, ':description': description }, ReturnValues: 'ALL_NEW' }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Se ha actualizado correctamente" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
}