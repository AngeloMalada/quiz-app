// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { dynamo } from 'utils/dynamo';
import { v4 } from 'uuid';

type Team = {
  teamName: string;
  teamMembers: number;
};

type Data = {
  totalPlayers: number;
};

type Params = {
  TableName: string;
  FilterExpression: string;
  //   ConditionExpression: string;
  ExpressionAttributeNames: {
    '#type': string;
  };
  ExpressionAttributeValues: {
    ':type': string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const params: Params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME!,
      //   ConditionExpression: '#type = :type',
      FilterExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':type': 'team',
      },
    };

    const data = await dynamo.scan(params).promise();
    //show how many players in total are there
    let totalPlayers = 0;
    data.Items?.forEach((item) => {
      totalPlayers += item.teamMembers;
    });
    console.log(totalPlayers);

    res.status(200).json({ totalPlayers });
  }
}
