import style from "./Button.module.css";

export default function Button({ children, type }) {
  return (
    <button className={style.Button} role="button" type={type}>
      {children}
    </button>
  );
}
