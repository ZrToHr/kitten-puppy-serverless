import { PostConfirmationTriggerEvent } from 'aws-lambda';

const RegisterInDynamo = async (event: PostConfirmationTriggerEvent) => {
  console.log(event.request.userAttributes);
};

export const main = RegisterInDynamo;
