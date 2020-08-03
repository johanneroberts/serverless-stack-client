const dev = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://w2ujrzzulh.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_VubYho1G7",
    APP_CLIENT_ID: "20apgenm5rtrert0v98pf17a34",
    IDENTITY_POOL_ID: "eu-west-1:5a80232f-9aff-4570-aaa1-c95bbec42d7d"
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://00ddi513dl.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_1iteabsuQ",
    APP_CLIENT_ID: "sg4233qqbrdbb4v2ukvlnse9v",
    IDENTITY_POOL_ID: "eu-west-1:cd95d90b-f899-407a-9df1-e8f2c3be2838"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : prod;

export default {
  ...config
};
