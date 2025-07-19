import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github, Twitter, Mail, Gauge, Heart,
  Trophy, ArrowUpRight, Headphones,
  Calendar, Users, Flag, BookOpen,
  Shield, ExternalLink, ScrollText,
  Instagram, CircleDot
} from 'lucide-react';
import TireIcon from "@/assets/icons/TireIcon.svg"; // adjust the path as needed


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  const featuresLinks = [
    { name: 'Dashboard', href: '/dashboard',   icon: (
          <svg
              viewBox="0 0 512 512"
              className="w-4 h-4 text-red-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M256.004,0C114.613,0,0.001,114.613,0.001,256.004C0.001,397.387,114.613,512,256.004,512
          c141.383,0,255.996-114.613,255.996-255.996C511.999,114.613,397.387,0,256.004,0z M256.004,419.18
          c-90.128,0-163.185-73.048-163.185-163.176S165.876,92.82,256.004,92.82c90.12,0,163.176,73.057,163.176,163.185
          S346.124,419.18,256.004,419.18z"/>
              <path d="M256.004,271.78c8.718,0,15.776-7.058,15.776-15.776c0-8.718-7.058-15.784-15.776-15.784
          c-8.725,0-15.784,7.066-15.784,15.784C240.219,264.722,247.279,271.78,256.004,271.78z"/>
              <path d="M150.727,196.65c1.108,2.954,3.495,5.239,6.5,6.212l56.239,18.289c5.239,1.684,10.977,0.787,15.429-2.446
          c4.444-3.25,7.092-8.421,7.092-13.923v-59.1c0-3.148-1.446-6.136-3.927-8.082c-2.471-1.972-5.704-2.683-8.768-1.972
          c0,0,0.838-0.634-4.85,1.152c-26.541,8.37-49.283,25.34-64.898,47.666c-3.216,4.587-1.98,3.275-1.98,3.275
          C149.948,190.404,149.644,193.688,150.727,196.65z"/>
              <path d="M212.147,270.265c-1.701-5.248-5.807-9.361-11.045-11.045l-56.215-18.264
          c-2.996-0.973-6.271-0.516-8.895,1.218c-2.624,1.752-4.308,4.604-4.579,7.752c0,0-0.338-0.998-0.398,4.96
          c-0.254,27.828,8.87,54.683,25.273,76.451c3.368,4.469,2.488,2.886,2.488,2.886c2.073,2.378,5.103,3.682,8.235,3.554
          c3.156-0.127,6.076-1.684,7.921-4.24l34.768-47.861C212.933,281.234,213.839,275.487,212.147,270.265z"/>
              <path d="M269.927,309.206c-3.25-4.443-8.422-7.084-13.923-7.084c-5.509,0-10.681,2.641-13.906,7.084l-34.75,47.81
          c-1.845,2.547-2.438,5.814-1.575,8.861c0.838,3.038,3.03,5.51,5.95,6.738c0,0-1.066,0.025,4.596,1.921
          c26.389,8.844,54.75,8.454,80.505-0.424c5.289-1.819,3.52-1.473,3.52-1.473c2.912-1.218,5.095-3.706,5.933-6.736
          c0.846-3.047,0.245-6.297-1.6-8.845L269.927,309.206z"/>
              <path d="M367.155,240.939l-56.248,18.281c-5.23,1.684-9.352,5.797-11.037,11.045
          c-1.709,5.222-0.804,10.968,2.446,15.403l34.726,47.819c1.862,2.564,4.782,4.096,7.938,4.249c3.149,0.135,6.178-1.194,8.235-3.58
          c0,0-0.304,1.007,3.241-3.775c16.564-22.368,24.984-49.478,24.502-76.705c-0.094-5.586-0.33-3.792-0.33-3.792
          c-0.271-3.148-1.946-6-4.578-7.735C373.426,240.423,370.16,239.957,367.155,240.939z"/>
              <path d="M283.112,218.706c4.461,3.225,10.182,4.13,15.421,2.446l56.198-18.289c3.005-0.966,5.392-3.259,6.5-6.212
          c1.101-2.962,0.779-6.255-0.863-8.954c0,0,0.872,0.592-2.59-4.249c-16.148-22.674-39.321-39.042-65.372-47.006
          c-5.358-1.625-3.724-0.863-3.724-0.863c-3.072-0.711-6.296,0.016-8.751,1.98c-2.48,1.938-3.919,4.926-3.919,8.066v59.152
          C276.012,210.284,278.661,215.456,283.112,218.706z"/>
            </g>
          </svg>
      )
    },
    { name: 'Race Calendar', href: '/races', icon: <Calendar className="w-4 h-4 text-red-400" /> },
    { name: 'Driver Standings', href: '/standings/drivers', icon: <Users className="w-4 h-4 text-red-400" /> },
    { name: 'Team Standings', href: '/standings/teams', icon: <Flag className="w-4 h-4 text-red-400" /> },
  ];

  const resourcesLinks = [
    { name: 'Support the Project', href: 'https://ko-fi.com/bigunit', external: true, icon: <Heart className="w-4 h-4" /> },
    { name: 'FAQ', href: '/faq', icon: <ScrollText className="w-4 h-4" /> },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/wijj9', icon: <Github className="h-5 w-5" /> },
    { name: 'Mail', href: 'mailto:bigunti4269@gmail.com', icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-gray-950 border-t border-gray-800/30 mt-auto text-gray-400 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"></div>
      <div className="absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full bg-red-900/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-[300px] h-[300px] rounded-full bg-red-900/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto py-16 px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-6">
            <Link
                to="/dashboard"
                className="flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-2 w-fit"
            >
              <motion.div
                  whileHover={{rotate: 360}}
                  transition={{duration: 0.6, ease: "easeInOut"}}
              >
                <div className="relative">
                  <svg
                      viewBox="0 0 512 512"
                      className="h-7 w-7 text-red-500 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                          d="M256.004,0C114.613,0,0.001,114.613,0.001,256.004C0.001,397.387,114.613,512,256.004,512
              c141.383,0,255.996-114.613,255.996-255.996C511.999,114.613,397.387,0,256.004,0z M256.004,419.18
              c-90.128,0-163.185-73.048-163.185-163.176S165.876,92.82,256.004,92.82c90.12,0,163.176,73.057,163.176,163.185
              S346.124,419.18,256.004,419.18z"
                      />
                      <path d="M256.004,271.78c8.718,0,15.776-7.058,15.776-15.776c0-8.718-7.058-15.784-15.776-15.784
            c-8.725,0-15.784,7.066-15.784,15.784C240.219,264.722,247.279,271.78,256.004,271.78z"/>
                      <path d="M150.727,196.65c1.108,2.954,3.495,5.239,6.5,6.212l56.239,18.289c5.239,1.684,10.977,0.787,15.429-2.446
            c4.444-3.25,7.092-8.421,7.092-13.923v-59.1c0-3.148-1.446-6.136-3.927-8.082c-2.471-1.972-5.704-2.683-8.768-1.972
            c0,0,0.838-0.634-4.85,1.152c-26.541,8.37-49.283,25.34-64.898,47.666c-3.216,4.587-1.98,3.275-1.98,3.275
            C149.948,190.404,149.644,193.688,150.727,196.65z"/>
                      <path d="M212.147,270.265c-1.701-5.248-5.807-9.361-11.045-11.045l-56.215-18.264
            c-2.996-0.973-6.271-0.516-8.895,1.218c-2.624,1.752-4.308,4.604-4.579,7.752c0,0-0.338-0.998-0.398,4.96
            c-0.254,27.828,8.87,54.683,25.273,76.451c3.368,4.469,2.488,2.886,2.488,2.886c2.073,2.378,5.103,3.682,8.235,3.554
            c3.156-0.127,6.076-1.684,7.921-4.24l34.768-47.861C212.933,281.234,213.839,275.487,212.147,270.265z"/>
                      <path d="M269.927,309.206c-3.25-4.443-8.422-7.084-13.923-7.084c-5.509,0-10.681,2.641-13.906,7.084l-34.75,47.81
            c-1.845,2.547-2.438,5.814-1.575,8.861c0.838,3.038,3.03,5.51,5.95,6.738c0,0-1.066,0.025,4.596,1.921
            c26.389,8.844,54.75,8.454,80.505-0.424c5.289-1.819,3.52-1.473,3.52-1.473c2.912-1.218,5.095-3.706,5.933-6.736
            c0.846-3.047,0.245-6.297-1.6-8.845L269.927,309.206z"/>
                      <path d="M367.155,240.939l-56.248,18.281c-5.23,1.684-9.352,5.797-11.037,11.045
            c-1.709,5.222-0.804,10.968,2.446,15.403l34.726,47.819c1.862,2.564,4.782,4.096,7.938,4.249c3.149,0.135,6.178-1.194,8.235-3.58
            c0,0-0.304,1.007,3.241-3.775c16.564-22.368,24.984-49.478,24.502-76.705c-0.094-5.586-0.33-3.792-0.33-3.792
            c-0.271-3.148-1.946-6-4.578-7.735C373.426,240.423,370.16,239.957,367.155,240.939z"/>
                      <path d="M283.112,218.706c4.461,3.225,10.182,4.13,15.421,2.446l56.198-18.289c3.005-0.966,5.392-3.259,6.5-6.212
            c1.101-2.962,0.779-6.255-0.863-8.954c0,0,0.872,0.592-2.59-4.249c-16.148-22.674-39.321-39.042-65.372-47.006
            c-5.358-1.625-3.724-0.863-3.724-0.863c-3.072-0.711-6.296,0.016-8.751,1.98c-2.48,1.938-3.919,4.926-3.919,8.066v59.152
            C276.012,210.284,278.661,215.456,283.112,218.706z"/>
                    </g>
                  </svg>
                  <motion.div
                      className="absolute inset-0 rounded-full bg-red-500/20"
                      animate={{scale: [1, 1.3, 1]}}
                      transition={{duration: 2, repeat: Infinity, repeatType: "loop"}}
                  />
                </div>
              </motion.div>
                <span className="font-bold text-2xl tracking-tight">F1<span
                    className="text-red-500"> Analytics</span></span>
            </Link>

            <p className="text-gray-400 max-w-md leading-relaxed">
              F1 Fans dream tool for real-time analytics.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link) => (
                  <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white p-2 rounded-full bg-gray-900/70 border border-gray-800/50 hover:border-red-500/30 hover:bg-gray-800 transition-all duration-200"
                      aria-label={link.name}
                      whileHover={{y: -3, transition: {duration: 0.2}}}
                  >
                    {link.icon}
                  </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h3 className="font-semibold mb-6 text-white text-base tracking-wide flex items-center">
              <Flag className="w-4 h-4 text-red-500 mr-2"/>
              Features
            </h3>
            <ul className="space-y-4">
              {featuresLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                        to={link.href}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold mb-6 text-white text-base tracking-wide flex items-center">
              <BookOpen className="w-4 h-4 text-red-500 mr-2"/>
              Resources
            </h3>
            <ul className="space-y-4">
              {resourcesLinks.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        >
                          <span
                              className="group-hover:translate-x-1 transition-transform duration-200">{link.icon}</span>
                          <span>{link.name}</span>
                          <ExternalLink className="h-3 w-3 ml-1 opacity-70"/>
                        </a>
                    ) : (
                        <Link
                            to={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-red-500" />
            <span>&copy; {currentYear} F1 Analytics</span>
          </p>
          <div className="flex items-center text-gray-500">
            <span>Made by an F1 fan</span>
            <Heart className="h-3.5 w-3.5 mx-1.5 text-red-500 fill-current animate-pulse" />
            <span>for F1 fans: <a href="https://github.com/wijj9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-400 transition-colors"> BigUnit</a></span>
          </div>
        </div>
        
        {/* F1 Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800/30 text-xs text-center">
          <p className="text-gray-500 max-w-4xl mx-auto">
            F1 Analytics is not affiliated, associated, authorized, endorsed by, or in any way officially connected with
            Formula 1, Formula One, F1, or any of its subsidiaries or affiliates. The official Formula 1 website is available at <a href="https://www.formula1.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-white transition-colors">formula1.com</a>.
          </p>
          <p className="text-gray-500 mt-3 max-w-4xl mx-auto">
            F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, and related marks are trademarks of Formula One Licensing BV.
            All content, data visualization, and analysis on this site are not official and not licensed by Formula 1.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
