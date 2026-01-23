class UserService {
  generateName(): string {
    const randomDigits = Math.floor(Math.random() * 899999999) + 100000;
    return `Пользователь${randomDigits}`;
  }
}

export const userService = new UserService();
