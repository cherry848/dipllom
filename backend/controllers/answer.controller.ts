import { Request, Response } from "express";
import {
  AnswersGetCourseAnswersParams,
  DeleteAnswerParams,
  TestAnswerCreateOrUpdateReq,
} from "../types/testAnswer.types";
import { ReqBodyType } from "../types/types";
import { AppError, ErrorCodes } from "../appError";
import { answerService } from "../services/answer.service";

class AnswerController {
  async getCourseAnswers(
    req: Request<AnswersGetCourseAnswersParams>,
    res: Response
  ) {
    const { courseId } = req.params;
    const answers = await answerService.getCourseAnswers({ courseId });
    res.json({ answers });
  }

  async createOrUpdateAnswer(
    req: Request<{}, {}, ReqBodyType<TestAnswerCreateOrUpdateReq>>,
    res: Response
  ) {
    const { answer } = req.body ?? {};

    if (!answer) {
      throw new AppError("Нет answer", ErrorCodes.INVALID_DATA);
    }

    const updatedAnswer = await answerService.createOrUpdateAnswer(answer);

    res.json({ message: "Ответ обновлен", answer: updatedAnswer });
  }

  async deleteAnswer(req: Request<DeleteAnswerParams>, res: Response) {
    const { answerId } = req.params;
    await answerService.deleteAnswer(answerId);
    res.json({ message: "Ответ удален" });
  }
}

export const answerController = new AnswerController();
