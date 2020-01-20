import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
export async function main(event, context) {
 const params = {
 TableName: process.env.tableName,
 // 'KeyConditionExpression' defines the conditionfor the query
 // - 'userId = :userId': only return items withmatching 'userId'
 // partition key
 // 'ExpressionAttributeValues' defines the value inthe condition
 // - ':userId': defines 'userId' to be IdentityPool identity id
 // of the authenticated user
 KeyConditionExpression: "userId = :userId",
 ExpressionAttributeValues: {
    ":userId":event.requestContext.identity.cognitoIdentityId
 }
 };
 try {
 const result = await dynamoDbLib.call("query", params);
 // Return the matching list of items in responsebody
 return success(result.Items);
 } catch (e) {
 return failure({ status: false });
 }
}