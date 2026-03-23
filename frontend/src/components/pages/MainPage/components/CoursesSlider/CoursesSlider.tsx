import type { Course } from "../../../../../types/course.types";
import s from "./CoursesSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cn from "classnames";
import { CourseCard } from "../CourseCard/CourseCard";
import Slider from "react-slick";
import { useState } from "react";
import { Link } from "react-router";

type CoursesSliderProps = {
  title: string;
  courses: Course[];
};

type PrevArrowProps = {
  rotate?: boolean;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
};

const PrevArrow = ({ rotate, onClick, className, disable }: PrevArrowProps) => {
  return (
    <div
      className={cn(
        s.arrow_prev,
        rotate && s.rotate,
        disable && s.disable,
        className
      )}
      onClick={onClick}
    >
      <svg
        width="29"
        height="59"
        viewBox="0 0 29 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.0435 57.0222L1.10303 28.8785M27.103 1.02225L1.16252 28.8788"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export const CoursesSlider = ({ title, courses }: CoursesSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>

      <Slider
        className={s.slider}
        infinite={false}
        slidesToShow={3}
        slidesToScroll={1}
        prevArrow={<PrevArrow disable={currentSlide === 0} />}
        nextArrow={<PrevArrow rotate disable={currentSlide === 5 - 3} />}
        draggable={false}
        beforeChange={(_, next) => setCurrentSlide(next)}
      >
        {courses.map((data) => (
          <CourseCard key={data._id} {...data} />
        ))}
      </Slider>

      <Link to={"catalog"} className={s.link}>
        Смотреть все →
      </Link>
    </div>
  );
};
