import PropTypes from "prop-types";
import { motion } from "framer-motion";
export default function ResourceCard({ title, desc, tag, icon, delay = 0 }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-start space-x-4">
        <div className="bg-orange-500/10 p-3 rounded-xl text-orange-500">
          {icon}
        </div>
        <div className="flex-1">
          <span className="inline-block bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {tag}
          </span>
          <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
          <p className="text-gray-600 mb-6">{desc}</p>
          <div className="flex items-center justify-between">
            <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center">
              {/* arrow icon */}
              Read Article
            </button>
            <span className="text-gray-400 text-sm">5&nbsp;min read</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

ResourceCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  tag: PropTypes.string,
  icon: PropTypes.node,
  delay: PropTypes.number,
};
