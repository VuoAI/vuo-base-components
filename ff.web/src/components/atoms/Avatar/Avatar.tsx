import styles from "./Avatar.module.scss";

export const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <img
        className={styles.avatar__image}
        src="https://placehold.co/50x50"
        alt=""
      />
    </div>
  );
};
