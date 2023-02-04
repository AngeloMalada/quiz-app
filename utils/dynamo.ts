import AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME;
