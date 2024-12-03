import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i0.wp.com/worldpoultryfoundation.org/wp-content/uploads/2018/04/Mother_Feeding_01-e1525103650102.jpg?fit=768%2C512")'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <motion.h1 
              {...fadeIn}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Making Farmers Healthier and Wealthier
            </motion.h1>
            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              EthioChicken provides high-quality day-old chicks and poultry feeds to empower farmers across Ethiopia
            </motion.p>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="space-x-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
              >
                View Our Products
                <ChevronRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition-colors"
              >
                Become an Agent
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Products
          </motion.h2>
          
          {/* Chickens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://images.squarespace-cdn.com/content/v1/6532265431cb2861a8deb911/fcebd6f1-7d0e-4963-a8ec-edbe4ad6e56f/sasso.jpg"
                alt="Sasso T451"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sasso T451</h3>
                <p className="text-gray-600 mb-4">
                  Dual purpose chicken that can be used for both egg and meat production under scavenger/supplement feeding environments.
                </p>
                <Link
                  to="/products/sasso-t451"
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  Learn More
                  <ChevronRight className="ml-1" size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://images.squarespace-cdn.com/content/v1/6532265431cb2861a8deb911/5104b3a1-43d0-410f-9184-819099ab06ab/bovans-brown.width-610.jpg"
                alt="Brown Egg Layer Chicken"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Brown Egg Layer Chicken</h3>
                <p className="text-gray-600 mb-4">
                  Commercial egg layer chicken which performs best under commercial poultry farming conditions with complete feeding.
                </p>
                <Link
                  to="/products/brown-egg-layer"
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  Learn More
                  <ChevronRight className="ml-1" size={16} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Feeds */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-8"
          >
            Poultry Feeds
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter Feed',
                description: 'A High protein chicken feed prepared to meet the dietary requirements of day-old chicks.',
                image: 'https://i5.walmartimages.com/asr/668370df-da4a-4a5f-8a1a-2d261a713e3a_1.a065b1c25b68e23d5ac36ceb9a2682c7.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff'
              },
              {
                name: 'Grower Feed',
                description: 'Designed to fulfill the dietary requirements of a chicken between the ages of 6 to 20 weeks.',
                image: 'https://th.bing.com/th/id/OIP.w7VHSZRoT33wcAXBX8Qe9gHaHa?rs=1&pid=ImgDetMain'
              },
              {
                name: 'Layer Feed',
                description: 'Commercial Layer feeds are for chickens laying eggs, supplying all the necessary nutrition.',
                image: 'https://th.bing.com/th/id/R.b0b030b5fc2cdedee06b2cf9e28bf986?rik=XGSvPQwTb1ISuw&pid=ImgRaw&r=0'
              }
            ].map((feed, index) => (
              <motion.div
                key={feed.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={feed.image}
                  alt={feed.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-2">{feed.name}</h4>
                  <p className="text-gray-600 mb-4">{feed.description}</p>
                  <Link
                    to={`/products?category=feeds`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    View Details
                    <ChevronRight className="ml-1" size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;