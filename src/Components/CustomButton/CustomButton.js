import { Link } from "react-router-dom";
import clsx from "clsx";
import "./CustomButton.css";

export function CustomButton({
  id,
  onClick,
  children,
  variant,
  size,
  className,
  link,
  ...rest
}) {
  if (link) {
    return (
      <Link
        id={id}
        to={link}
        className={clsx(className, {
          button: variant,
          "button-dark": variant === "dark",
          "button-bordered": variant === "bordered",
          "button-small": size === "small",
        })}
        {...rest}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button   
        id={id}
        className={clsx(className, {
          button: variant,
          "button-dark": variant === "dark",
          "button-bordered": variant === "bordered",
          "button-small": size === "small",
        })}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
