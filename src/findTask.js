import AWS from "aws-sdk";

export const findTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
        const result = await dynamodb.get({ TableName: 'notificationsTable', Key: { id } }).promise();
        const task = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify(task),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

