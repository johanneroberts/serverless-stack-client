const dev = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://xth4fap4mk.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_n2ARcsCaW",
    APP_CLIENT_ID: "2iun50kd9mm5shv50ubm3d97r",
    IDENTITY_POOL_ID: "2iun50kd9mm5shv50ubm3d97r"
  }
};

const prod = {
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://ki1nq8zxgc.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_VubYho1G7",
    APP_CLIENT_ID: "20apgenm5rtrert0v98pf17a34",
    IDENTITY_POOL_ID: "eu-west-1:5a80232f-9aff-4570-aaa1-c95bbec42d7d"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : prod;

export default {
  ...config
};
