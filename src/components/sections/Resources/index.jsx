import PropTypes from "prop-types";
import SectionHeader from "../../common/SectionHeader";
import FeaturedResource from "./FeaturedResource";
import ResourceCard from "./ResourceCard";
import { resources } from "../../../utils/constants";

export default function Resources({ isDarkMode }) {
  return (
    <section
      id="resources"
      className="py-24 px-4 md:px-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* header */}
        <SectionHeader
          title="Resources"
          subtitle="Discover insights, guides, and innovations shaping the future of AI"
          isDarkMode={isDarkMode}
        />

        {/* featured */}
        <FeaturedResource isDarkMode={isDarkMode} />

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {resources.map((r, i) => (
            <ResourceCard key={r.title} {...r} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

Resources.propTypes = { isDarkMode: PropTypes.bool };
