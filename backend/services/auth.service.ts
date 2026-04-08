import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type {
  AuthLoginServiceData,
  AuthRegisterServiceData,
  AuthGetTokensServiceReturnData,
  AuthAccessJwtData,
  AuthRefreshJwtData,
} from "../types/auth.types";
import { AppError, ErrorCodes } from "../appError";
import userModel from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshSecretKey";

class AuthService {
  async register(data: AuthRegisterServiceData) {
    const isExistUser = await UserModel.findOne({ email: data.email });

    if (isExistUser)
      throw new AppError("Пользователь уже существует", ErrorCodes.USER_EXIST);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      email: data.email,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: AuthLoginServiceData) {
    const user = await UserModel.findOne({ email: data.email });

    const isMatch = await bcrypt.compare(data.password, user?.password ?? "");

    if (!user || !isMatch)
      throw new AppError(
        "Пользователь не найден или неверный пароль",
        ErrorCodes.INVALID_CREDENTIALS,
      );

    return user;
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as AuthAccessJwtData;
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, JWT_REFRESH_SECRET) as AuthRefreshJwtData;
  }

  async authorize(accessToken: string) {
    const { userId } = this.verifyAccessToken(accessToken);

    const user = await userModel
      .findById(userId)
      .populate("coursesProgress.courseId", "name img desc rating");

    if (!user) throw new AppError("юзер не найден", ErrorCodes.USER_NOT_FOUND);

    const userObj = user.toObject();

    // 🔥 преобразуем courseId → course
    (userObj as any).coursesProgress = userObj.coursesProgress.map(
      (item: any) => ({
        course: item.courseId,
        progress: item.progress,
      }),
    );

    return userObj;
  }

  getTokens(userId: string): AuthGetTokensServiceReturnData {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
