// src/components/common/Button.jsx
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Reusable button.
 *
 * Props
 * -----
 * kind:   "primary" | "ghost"
 * className: extra Tailwind classes
 * ...props: any other button props (onClick, disabled, etc.)
 */
export default function Button({ children, kind = "primary", className = "", ...props }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all transform hover:-translate-y-1 flex items-center justify-center";

  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    ghost: "bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50",
  };

  return (
    <button className={clsx(base, variants[kind], className)} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  kind: PropTypes.oneOf(["primary", "ghost"]),
  className: PropTypes.string,
};
