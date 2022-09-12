import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

interface APIGatewayResponse {
  body: string;
  statusCode: number;
  headers?: { [key: string]: string };
}

export const formatJSONResponse = ({
  body,
  statusCode = 200,
  headers,
}: {
  body: any;
  statusCode?: number;
  headers?: { [key: string]: string };
}) =>
  ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
    statusCode,
    body: JSON.stringify(body),
  } as APIGatewayResponse);
