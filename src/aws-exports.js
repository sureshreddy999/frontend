import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_T0eMyWgIP',  // your actual user pool ID
  ClientId: '6gnvc58ddlmgfh3lhke9vjq9ng', // your actual app client ID
};

export default new CognitoUserPool(poolData);
