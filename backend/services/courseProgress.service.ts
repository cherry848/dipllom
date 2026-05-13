import  CourseModel  from "../models/course.model";
import  UserModel  from "../models/user.model";

class CourseProgressService {
  async completeLesson(
    userId: string,
    courseId: string,
    moduleId: string,
    stepId: string,
  ) {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");

    let progress = user.coursesProgress.find(
      (c: any) => c.courseId.toString() === courseId,
    );

    if (!progress) {
      user.coursesProgress.push({
        courseId,
        progress: 0,
        steps: [],
      });

      progress = user.coursesProgress.find(
        (c: any) => c.courseId.toString() === courseId,
      );
    }

    const existingStep = progress.steps.find(
      (s: any) => s.stepId === stepId,
    );

    if (!existingStep) {
      progress.steps.push({
        moduleId,
        stepId,
        completed: true,
        passed: true,
        questions: [],
      });
    }

    await this.calculateProgress(user, courseId);

    await user.save();

    return { success: true };
  }

  async submitTest(
    userId: string,
    courseId: string,
    moduleId: string,
    stepId: string,
    answers: {
      questionId: string;
      selectedAnswers: string[];
    }[],
  ) {
    const course = await CourseModel.findById(courseId);

    if (!course) throw new Error("Course not found");

    const module: any = course.modules.find(
      (m: any) => m._id.toString() === moduleId,
    );

    if (!module) throw new Error("Module not found");

    const step: any = module.steps.find(
      (s: any) => s._id.toString() === stepId,
    );

    if (!step) throw new Error("Step not found");

    let valid = 0;

    const checkedQuestions = [];

    for (const ua of answers) {
      const question = step.questions.find(
        (q: any) => q._id.toString() === ua.questionId,
      );

      if (!question) continue;

      const correct = question.answers
        .filter((a: any) => a.correct)
        .map((a: any) => a._id.toString())
        .sort();

      const selected = [...ua.selectedAnswers].sort();

      const isCorrect =
        JSON.stringify(correct) ===
        JSON.stringify(selected);

      if (isCorrect) valid++;

      checkedQuestions.push({
        questionId: ua.questionId,
        selectedAnswers: selected,
        correct: isCorrect,
      });
    }

    const passed = valid === step.questions.length;

    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found");

    let progress = user.coursesProgress.find(
      (c: any) => c.courseId.toString() === courseId,
    );

    if (!progress) {
      user.coursesProgress.push({
        courseId,
        progress: 0,
        steps: [],
      });

      progress = user.coursesProgress.find(
        (c: any) => c.courseId.toString() === courseId,
      );
    }

    const existingStep = progress.steps.find(
      (s: any) => s.stepId === stepId,
    );

    if (existingStep) {
      existingStep.completed = passed;
      existingStep.passed = passed;
      existingStep.questions = checkedQuestions;
    } else {
      progress.steps.push({
        moduleId,
        stepId,
        completed: passed,
        passed,
        questions: checkedQuestions,
      });
    }

    await this.calculateProgress(user, courseId);

    await user.save();

    return {
      success: passed,
      valid,
      total: step.questions.length,
    };
  }

  async calculateProgress(user: any, courseId: string) {
    const course = await CourseModel.findById(courseId);
    if (!course) return;

    const progress = user.coursesProgress.find(
      (c: any) => c.courseId.toString() === courseId,
    );

    if (!progress) return;

    const totalSteps = course.modules.reduce(
      (acc: number, m: any) => acc + m.steps.length,
      0,
    );

    const completed = progress.steps.filter(
      (s: any) => s.completed,
    ).length;

    progress.progress = Math.round(
      (completed / totalSteps) * 100,
    );
  }
}

export default new CourseProgressService();