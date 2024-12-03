import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWebAwesome, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';


const Footer = () => {
  return (
    <footer className="bg-[#8B0000] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/6532265431cb2861a8deb911/cf3a9b68-84fd-465f-a7d8-4394c6183f04/EC_Logo_PNG-01.png" 
              alt="EthioChicken Logo" 
              className="h-24 w-24 mb-4"
            />
            <p className="text-center md:text-left">For Fulfilled Life</p>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/64f238448f73355958247421/b1c7df47-c4a7-468d-8d5c-24bca56c4ba2/Hatch-Africa-Turmeric_1%404x.png?format=1500w" 
              alt="Hatch Africa Logo" 
              className="h-16 mt-4"
            />
            <a href="https://hatchafrica.co/about" className="text-yellow-400 hover:underline mt-2">Hatch Africa</a>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-yellow-400 text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MdLocationOn className="text-xl" />
                <div>
                  <p>Ethio China Street, Kadco Group</p>
                  <p>Building #2, 8th floor,</p>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                <MdEmail className="text-xl" />
                <p>info@ethiochicken.com</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MdPhone className="text-xl" />
                <div>
                  <p>+251 116672229</p>
                  <p>+251 944968359</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-yellow-400 text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.linkedin.com/company/ethiochicken/" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faLinkedin} size="2x"/>
              </a>
              <a href="https://www.youtube.com/@ethiochicken4263" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faYoutube} size="2x"/>
              </a>
              <a href="https://www.facebook.com/forfulfilledlife/" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faFacebook} size="2x"/>
              </a>
              <a href="https://t.me/s/forfulfilledlife" className="hover:text-yellow-400">
                <FontAwesomeIcon icon={faGlobe} size="2x" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-red-900">
          <p>© Copyright 2024. EthioChicken. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer