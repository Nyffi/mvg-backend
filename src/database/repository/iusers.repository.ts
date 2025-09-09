import { User } from 'src/interfaces/user.interface';

export abstract class IUsersRepository {
  public abstract findOne(email: string): Promise<User | undefined>;
  public abstract create(user: User): Promise<User>;
}
