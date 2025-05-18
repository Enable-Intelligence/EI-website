
/* src/components/common/SectionHeader.jsx */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";


export default function SectionHeader({
  title,
  subtitle = "",
  color = "orange",
  dark = false,
  align = "center",
}) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={classNames("flex flex-col mb-8 md:mb-12 w-full", alignClass)} data-aos="fade-up">
      {/* gradient badge */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r
                        from-[var(--tw-color-start)]/20
                        to-[var(--tw-color-end)]/20 rounded-2xl blur-xl" />
        <div
          className="inline-block px-6 py-2 rounded-2xl backdrop-blur-sm relative"
          style={{
            "--tw-color-start": `theme('colors.${color}.500')`,
            "--tw-color-end": `theme('colors.${color}.600')`,
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black"
              style={{ color: `rgb(var(--tw-color-end))` }}>
            {title}
          </h2>
        </div>
      </div>

      {subtitle && (
        <p
          className={classNames(
            "mt-3 text-sm sm:text-base md:text-lg px-4 max-w-2xl",
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
  color: PropTypes.string,
  dark: PropTypes.bool,
  align: PropTypes.oneOf(["center", "left"]),
};
