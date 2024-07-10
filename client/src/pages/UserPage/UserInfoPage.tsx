import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Account } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const UserInfoPage: FC = () => {
  const { me } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!me) {
      navigate("/login");
    }
  }, [me, navigate]);

  if (!me) {
    return <p>user not logged</p>;
  }
  return (
    <div className={styles.user__page}>
      <Account />
    </div>
  );
};

export { UserInfoPage };
