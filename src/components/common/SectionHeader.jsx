import PropTypes from "prop-types";
import clsx from "clsx";

/** Map color names → Tailwind classes */
const palette = {
  orange: { text: "text-orange-600", grad: "from-orange-500/20 to-orange-600/20" },
  teal:   { text: "text-teal-600",   grad: "from-teal-500/20   to-teal-600/20" },
  violet: { text: "text-violet-600", grad: "from-violet-500/20 to-violet-600/20" },
  // add more as needed
};

export default function SectionHeader({
  title,
  subtitle = "",
  color = "orange",
  dark = false,
  align = "center",
}) {
  const { text, grad } = palette[color] || palette.orange;
  const isLeft = align === "left";

  return (
    <div
      className={clsx(
        "flex flex-col mb-8 md:mb-12 w-full",
        isLeft ? "items-start text-left" : "items-center text-center"
      )}
      data-aos="fade-up"
    >
      {/* gradient badge */}
      <div className="relative">
        <div className={clsx("absolute -inset-4 rounded-2xl blur-xl", `bg-gradient-to-r ${grad}`)} />
        <div className="inline-block px-6 py-2 rounded-2xl backdrop-blur-sm relative">
          <h2 className={clsx("font-black", "text-3xl sm:text-4xl md:text-5xl", text)}>
            {title}
          </h2>
        </div>
      </div>

      {subtitle && (
        <p
          className={clsx(
            "mt-3 px-4 max-w-2xl",
            "text-sm sm:text-base md:text-lg",
            dark ? "text-gray-200" : "text-gray-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(palette)),
  dark: PropTypes.bool,
  align: PropTypes.oneOf(["center", "left"]),
};
