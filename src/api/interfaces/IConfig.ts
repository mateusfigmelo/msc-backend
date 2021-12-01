interface IConfig {
  ip: string;
  port: string;
  environment: string;
  mongodb: {
    uri: string;
  },
  auth: {
    secret: string;
  },
  email: {
    host: string;
    port: number;
    secure: boolean;
    pool: boolean;
    secureConnection: boolean;
    auth: {
      user: string;
      pass: string;
    }
    tls: {
      rejectUnauthorized: boolean;
    }
  },
  firebase: {
    storageBucket: string;
    emailTemplateBucket: string;
    applicationImageBucket: string;
    bucketName: string;
  }
}

export type { IConfig };