export const generateS3FullPathUtil = (key: string): string => {
  return `${process.env.S3_PROTOCOL}://${process.env.S3_BUCKET_NAME}.${process.env.S3_LITERAL}.${process.env.S3_REGION}.${process.env.B2_SERVICE_NAME}/${key}`;
};
