// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { dynamo } from 'utils/dynamo';
import { v4 } from 'uuid';
type Data = {
  title: string;
  content: string;
  imageUrl: string;
};

type Params = {
  TableName: string;
  ConditionExpression: string;
  Item: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    type: string;
  };
};

type Body = {
  title: string;
  content: string;
  imageUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { title, content, imageUrl } = req.body as unknown as Body;

  if (req.method === 'POST') {
    const params: Params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME!,
      ConditionExpression: 'attribute_not_exists(id)',
      Item: {
        id: v4(),
        type: 'post',
        title: title,
        content: content,
        imageUrl: imageUrl,
      },
    };
    const data = await dynamo.put(params).promise();
    res.status(200).json({ title, content, imageUrl });
  }
}
