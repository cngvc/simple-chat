import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe(); // should be added in context
  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};

export default Guard;
