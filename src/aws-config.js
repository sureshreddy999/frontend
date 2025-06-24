import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_T0eMyWgIP',      // Replace with your actual pool ID
  ClientId: '6gnvc58ddlmgfh3lhke9vjq9ng', // Replace with your actual client ID
};

export default new CognitoUserPool(poolData);
