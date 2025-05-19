import PropTypes from "prop-types";
import resourceImg from "../../../assets/resource.png"; 
import Button from "../../common/Button";

export default function FeaturedResource() {
  return (
    <div className="relative mb-16" data-aos="fade-up">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-8">
          {/* left half – image */}
          <div className="relative h-96 group">
            <img
              src={resourceImg}
              alt="Featured Resource"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center">
                {/* icon */}
              </span>
              <h3 className="text-3xl font-bold mt-4">World Refugee Day&nbsp;2030</h3>
              <p className="text-gray-200 mt-2">
                Exploring the intersection of AI and humanitarian efforts
              </p>
            </div>
          </div>
          {/* right half – blurb */}
          <div className="p-8 flex flex-col justify-center">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Join us in exploring how artificial intelligence is revolutionizing
              humanitarian aid and refugee support. Discover innovative solutions and
              real-world applications that are making a difference.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button kind="primary">Read Article</Button>
              <Button kind="ghost">Download PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

FeaturedResource.propTypes = { isDarkMode: PropTypes.bool };
