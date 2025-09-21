import css from "./ErrorMessage.module.css";

export interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      There was an error, please try again... {message ? `(${message})` : ""}
    </p>
  );
}
