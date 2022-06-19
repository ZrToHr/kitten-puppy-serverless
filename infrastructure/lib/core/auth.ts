import {
  IUserPool,
  IUserPoolClient,
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AppAuth extends Construct {
  public readonly userPool: IUserPool;
  public readonly userPoolClient: IUserPoolClient;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.userPool = new UserPool(this, 'KittenPuppyUserPool', {
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for your little kitten and puppy',
        emailBody: 'Thanks for signing up! Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage: 'Thanks for signing up! Your verification code is {####}',
      },
      autoVerify: {
        email: true,
      },
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        preferredUsername: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
    });

    this.userPoolClient = new UserPoolClient(this, 'KittenPuppyUserPoolClient', {
      userPool: this.userPool,
      generateSecret: false,
    });
  }
}
