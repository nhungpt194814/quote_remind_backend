import * as bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}