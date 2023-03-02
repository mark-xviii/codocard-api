import { hashStringUtil } from './hash-string.util';

const moment = require('moment');

export const generateFileNameUtil = (fileName: string): string => {
  const extension = fileName.split('.').at(-1);
  return `${hashStringUtil(moment.now().toString())}${
    extension && `.${extension}`
  }`;
};
