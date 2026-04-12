import { NextFunction, Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { CreateReviewData, Review } from "../types/review.types";
import { ReqBodyType } from "../types/types";
import { AppError, ErrorCodes } from "../appError";

class ReviewController {
  async save(
    req: Request<{ id: string }, {}, CreateReviewData>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, rating, comment } = req.body ?? {};

      if (!userId || !rating || !comment)
        throw new AppError(
          "Некорректные входные данные",
          ErrorCodes.INVALID_DATA,
        );

      const review = await reviewService.save(req.params.id, {
        userId,
        rating,
        comment,
      });

      res.status(201).json({ message: "Отзыв создан", review });
    } catch (e) {
      next(e);
    }
  }

  async getAll(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const reviews = await reviewService.getAll(req.params.id);

      res.json({ message: "Все отзывы по курсу", reviews });
    } catch (e) {
      next(e);
    }
  }
}

export const reviewController = new ReviewController();
