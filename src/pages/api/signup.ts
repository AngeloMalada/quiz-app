// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { dynamo } from 'utils/dynamo';
import { v4 } from 'uuid';
type Data = {
  teamName: string;
  teamMembers: number;
};

type Params = {
  TableName: string;
  ConditionExpression: string;
  Item: {
    id: string;
    teamName: string;
    teamMembers: number;
    type: string;
  };
};

type Query = {
  teamName: string;
  teamMembers: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { teamName, teamMembers } = req.body as unknown as Query;

  if (req.method === 'POST') {
    const params: Params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME!,
      ConditionExpression: 'attribute_not_exists(id)',
      Item: {
        id: v4(),
        type: 'team',
        teamName: teamName,
        teamMembers: teamMembers,
      },
    };
    const data = await dynamo.put(params).promise();
    res.status(200).json({ teamName, teamMembers });
  }
}
