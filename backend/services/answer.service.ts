import {
  AnswersGetCourseAnswerService,
  TestAnswerCreateOrUpdateService,
} from "../types/testAnswer.types";
import answerModel from "../models/testAnswer.model";
import { courseService } from "./course.service";
import { COURSE_MODULE_STEPS } from "../types/course.types";

class AnswerService {
  async getCourseAnswers({ courseId }: AnswersGetCourseAnswerService) {
    const course = await courseService.getCourseById(courseId);
    const answersIds: string[] = [];

    for (const { steps } of course.modules) {
      for (const { content } of steps) {
        for (const { variants } of content[COURSE_MODULE_STEPS.Test] ?? []) {
          for (const id of variants) {
            answersIds.push(id.toString());
          }
        }
      }
    }

    return await answerModel
      .find({
        _id: { $in: answersIds },
      })
      .lean();
  }

  async createOrUpdateAnswer(answer: TestAnswerCreateOrUpdateService) {
    if (answer.answerId) {
      return await answerModel.findByIdAndUpdate(answer.answerId, answer);
    }

    return await answerModel.create(answer);
  }

  async deleteAnswer(answerId: string) {
    answerModel.findByIdAndDelete(answerId);
  }
}

export const answerService = new AnswerService();
