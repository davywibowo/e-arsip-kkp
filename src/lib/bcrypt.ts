import bcrypt from "bcrypt";
export default class Bcrypt {
  static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
