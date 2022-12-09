import * as crypto from 'crypto';

// TODO: salt값 DB에 저장하고 사용
export const hash = async (plainText: string): Promise<string> => {
  return await crypto.createHash('sha512').update(plainText).digest('base64');
};

export const isHashValid = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return (
    (await crypto.createHash('sha512').update(password).digest('base64')) ===
    hashPassword
  );
};
