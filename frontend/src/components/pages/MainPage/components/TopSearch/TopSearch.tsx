import { useState } from "react";
import { Button } from "../../../../shared/Button/Button";
import { Input } from "../../../../shared/Input/Input";
import s from "./TopSearch.module.css";
import { useNavigate } from "react-router";

export const TopSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  return (
    <form
      className={s.container}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`catalog?query=${searchValue}`);
      }}
    >
      <Input
        icon={<img src="/search.svg" />}
        placeholder="Название курса, автор или язык программирования"
        classNames={{ container: s.input_container, input: s.input }}
        value={searchValue}
        onChange={setSearchValue}
      />

      <Button className={s.button}>Искать</Button>
    </form>
  );
};
