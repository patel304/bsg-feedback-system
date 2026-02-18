import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100">

      {/* HERO SECTION */}
      <div className="relative h-[80vh] flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1529336953121-a0c7d7a2d6b1"
          alt="BSG Camp"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-70"></div>

        <div className="relative text-center px-6">
          <h1 className="text-5xl font-bold mb-6">
            Bharat Scouts & Guides
          </h1>
          <p className="text-xl mb-6">
            Empowering Youth Through Leadership & Service
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
        <img
          src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
          alt="Scout Activity"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            About The Programme
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Bharat Scouts and Guides develops character,
            citizenship and physical fitness among young people
            through outdoor activities, leadership training and
            community service initiatives.
          </p>
        </div>
      </div>

      {/* PROGRAMMES SECTION */}
      <div className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Our Programmes
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            "Cubs & Bulbuls",
            "Scouts & Guides",
            "Rovers & Rangers",
            "Leadership Camps",
            "Community Service",
            "Skill Training"
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-900">
                {item}
              </h3>
              <p className="text-gray-600">
                Building skills, teamwork and responsibility among youth.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* VERIFY CTA */}
      <div className="bg-blue-900 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Verify Your Certificate
        </h2>
        <Link
          to="/verify"
          className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300"
        >
          Verify Now
        </Link>
      </div>

    </div>
  );
}

export default Home;