import bcrypt from 'bcrypt';

class Encryption {
  static GeneratePassword = async (password: string) => {
    const gensalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, gensalt);
  };

  static ComparePassword = async (passClient: string, passDb: string) => {
    return await bcrypt.compare(passClient, passDb);
  };
}

export default Encryption;
