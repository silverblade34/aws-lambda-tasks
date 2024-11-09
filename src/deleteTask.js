import AWS from "aws-sdk";

export const deleteTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        await dynamodb.delete({ TableName: 'notificationsTable', Key: { id } }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Se ha eliminado correctamente" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
}
