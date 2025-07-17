import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Menu,
  X,
  Gauge, 
  Flag,
  Users,
  UsersRound,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from '@/contexts/AuthContext'; // Keep import for now

const Navbar = () => {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loading } = useAuth(); // Keep for compatibility
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position for background opacity changes
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background opacity and blur based on scroll position
  const backgroundOpacity = Math.min(0.8 + (scrollPosition / 1000), 0.95);
  const blurAmount = Math.min(8 + (scrollPosition / 100), 12);

  // Expanded Nav Items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Races', href: '/races', icon: <Flag size={18} /> },
    { name: 'Drivers', href: '/standings/drivers', icon: <Users size={18} /> },
    { name: 'Teams', href: '/standings/teams', icon: <UsersRound size={18} /> },
    { name: 'Shop', href: '/Shop', icon: <UsersRound size={18} /> },
  ];

  // Loading state while checking auth
  if (loading) {
    return (
      <motion.nav 
        className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md h-16 md:h-20 flex items-center justify-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="text-gray-500 text-sm">Loading...</span>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full"
      initial={{ y: 0, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div 
        className="w-full h-16 md:h-20"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
          borderBottom: scrollPosition > 50 ? '1px solid rgba(75, 75, 75, 0.2)' : '1px solid rgba(31, 41, 55, 0.2)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <div className="w-full mx-auto h-full px-4 sm:px-8 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <motion.div
                whileHover={{rotate: 360}}
                transition={{duration: 0.6, ease: "easeInOut"}}
            >
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
            </motion.div>
            <motion.span
                className="font-bold text-lg md:text-xl text-white"
                whileHover={{scale: 1.05}}
                transition={{duration: 0.2}}
            >
              F1<span className="text-red-500"> Analytics</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <ul className="flex space-x-3">
              {navItems.map((item) => (
                  <motion.li key={item.name} whileHover={{scale: 1.05}}>
                    <NavLink
                        to={item.href}
                        end={item.href === '/dashboard'}
                        className={({isActive}) =>
                            cn(
                                "flex items-center space-x-2 px-4 py-2 rounded-md text-base font-medium transition-colors relative group",
                                isActive
                                    ? "text-white"
                                    : "text-gray-300 hover:text-white"
                            )
                        }
                    >
                      {({isActive}) => (
                          <>
                            <span className="mr-1.5">{item.icon}</span>
                            <span>{item.name}</span>
                            {isActive && (
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
                                    initial={{opacity: 0, width: 0}}
                                    animate={{opacity: 1, width: "100%"}}
                                    transition={{
                                      type: 'tween',
                                      ease: "easeInOut",
                                      duration: 0.3
                                    }}
                                />
                            )}
                            {!isActive && (
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"/>
                            )}
                          </>
                      )}
                    </NavLink>
                  </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <motion.button
                    whileTap={{scale: 0.95}}
                    className="text-gray-300 hover:text-white bg-transparent border-none p-2 rounded-md"
                >
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Open menu</span>
                </motion.button>
              </DrawerTrigger>
              <DrawerContent
                  className="h-[90vh] w-full max-w-[350px] bg-gray-900/95 backdrop-blur-md border-l-gray-800 text-white p-0">
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <Link to="/dashboard" className="flex items-center space-x-3" onClick={() => setDrawerOpen(false)}>
                      <Gauge className="h-6 w-6 text-red-500" />
                      <span className="font-bold text-lg">Fast<span className="text-red-500">lytics</span></span>
                    </Link>
                    <DrawerClose asChild>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white bg-transparent border-none p-2 rounded-md"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </motion.button>
                    </DrawerClose>
                  </div>

                  {/* Mobile Nav Links */}
                  <div className="space-y-1 mt-6">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        end={item.href === '/dashboard'}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center space-x-3 w-full px-5 py-4 rounded-md text-base font-medium transition-colors relative",
                            isActive 
                              ? "bg-gray-800/60 text-white" 
                              : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                          )
                        }
                        onClick={() => setDrawerOpen(false)}
                      >
                        {({ isActive }) => (
                          <>
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                            {isActive && (
                              <motion.span 
                                className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r" 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "100%" }}
                                transition={{ 
                                  type: 'tween', 
                                  ease: "easeInOut", 
                                  duration: 0.3 
                                }}
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
