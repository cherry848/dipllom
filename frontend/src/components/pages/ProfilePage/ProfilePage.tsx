import { useSearchParams } from "react-router";
import { List } from "../../List/List";
import { Container } from "../../shared/Container/Container";
import { ProfileContent } from "./components/ProfileContent/ProfileContent";
import s from "./ProfilePage.module.css";
import { CoursesContent } from "./components/CoursesContent/CoursesContent";
import { Settings } from "../../Settings/Settings";
import { Stats } from "./components/Stats/Stats";

export const ProfilePage = () => {
  const [params, setParams] = useSearchParams({ tab: "profile" });

  Object.fromEntries(params.entries());
  const currentTab = params.get("tab");

  return (
    <Container className={s.container}>
      <List currentTab={currentTab} onTabChange={(tab) => setParams({ tab })} />
      {currentTab === "profile" && (
        <ProfileContent navigate={(tab) => setParams({ tab })} />
      )}
      {currentTab === "courses" && <CoursesContent />}
      {currentTab === "stats" && <Stats />}
      {currentTab === "settings" && <Settings />}
    </Container>
  );
};
