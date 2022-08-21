import type { AWS } from '@serverless/typescript';

const CognitoResources: AWS['resources']['Resources'] = {
  CognitoUserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: 'kitten-puppy-auth-pool',
      UsernameAttributes: ['email'],
      AutoVerifiedAttributes: ['email'],
      MfaConfiguration: 'OFF',
      VerificationMessageTemplate: {
        DefaultEmailOption: 'CONFIRM_WITH_CODE',
        EmailSubject: 'Kitten Puppy Registration',
        EmailMessage: 'Please confirm your registration with {####}',
      },
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireUppercase: true,
          RequireSymbols: true,
        },
      },
      Schema: [
        {
          Name: 'username',
          AttributeDataType: 'String',
          Mutable: false,
          Required: true,
        },
        {
          Name: 'email',
          AttributeDataType: 'String',
          Mutable: false,
          Required: true,
        },
      ],
    },
  },
  CognitoUserPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'kitten-puppy-auth-pool-client',
      GenerateSecret: false,
      UserPoolId: {
        Ref: 'CognitoUserPool',
      },
    },
  },
};

export default CognitoResources;
