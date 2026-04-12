import { useSearchParams } from "react-router";
import { List } from "../../List/List";
import { Container } from "../../shared/Container/Container";
import { ProfileContent } from "./components/ProfileContent/ProfileContent";
import s from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const [params, setParams] = useSearchParams();

  Object.fromEntries(params.entries());
  const currentTab = params.get("current");

  return (
    <Container className={s.container}>
      <List
        currentTab={currentTab}
        onTabChange={(tab) => setParams({ current: tab })}
      />
      {currentTab === "profile" && <ProfileContent />}
    </Container>
  );
};
