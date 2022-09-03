import type { AWS } from '@serverless/typescript';

const CognitoResources: AWS['resources']['Resources'] = {
  CognitoUserPoolAuthPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: '${self:custom.authPoolName}',
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
          Name: 'email',
          AttributeDataType: 'String',
          Mutable: false,
          Required: true,
        },
      ],
    },
  },
  CognitoUserPoolClientAuthPoolClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: '${self:custom.authPoolClientName}',
      GenerateSecret: false,
      UserPoolId: {
        Ref: 'CognitoUserPoolAuthPool',
      },
    },
  },
};

export default CognitoResources;
