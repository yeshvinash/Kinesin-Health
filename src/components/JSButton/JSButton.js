import { Link } from "react-router-dom";
import clsx from "clsx";
import "./JSButton.css";

export function JSButton({
  id,
  onClick,
  children,
  variant,
  size,
  className,
  icon,
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
          "button-round": variant === "round",
          "button-primary": variant === "primary",
          "button-flushed": variant === "flushed",
          "button-light": variant === "light",
          "button-light-bordered": variant === "light-bordered",
          "button-primary-bordered": variant === "primary-bordered",
          "button-small": size === "small",
        })}
        {...rest}
      >
        {children}
        {icon && (
          <span className="d-inline-flex ms-lg-3 ms-5 btn-icon">{icon}</span>
        )}
      </Link>
    );
  } else {
    return (
      <button
        id={id}
        className={clsx(className, {
          button: variant,
          "button-dark": variant === "dark",
          "button-round": variant === "round",
          "button-primary": variant === "primary",
          "button-flushed": variant === "flushed",
          "button-light": variant === "light",
          "button-light-bordered": variant === "light-bordered",
          "button-primary-bordered": variant === "primary-bordered",
          "button-small": size === "small",
        })}
        onClick={onClick}
        {...rest}
      >
        {children}
        {icon && (
          <span className="d-inline-flex ms-lg-3 ms-4 btn-icon">{icon}</span>
        )}
      </button>
    );
  }
}
