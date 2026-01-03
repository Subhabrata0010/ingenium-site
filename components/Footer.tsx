import { faDiscord, faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function FooterIndex() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-[#d3d2bb] to-[#d2d1c3] rounded-t-3xl py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and social links */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/ing-logo.png"
              alt="Ingenium Logo"
              width={150}
              height={150}
              className="h-24 w-auto mb-4 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
              Official Web Magazine of Academy of Technology
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-ingeniumbrand transition-colors duration-300">
                <FontAwesomeIcon icon={faInstagram} size="lg" className="transform hover:scale-125 transition-transform duration-300" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-ingeniumbrand transition-colors duration-300">
                <FontAwesomeIcon icon={faFacebookF} size="lg" className="transform hover:scale-125 transition-transform duration-300" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-ingeniumbrand transition-colors duration-300">
                <FontAwesomeIcon icon={faXTwitter} size="lg" className="transform hover:scale-125 transition-transform duration-300" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-ingeniumbrand transition-colors duration-300">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" className="transform hover:scale-125 transition-transform duration-300" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href="/" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news-activities" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  News & Activities
                </Link>
              </li>
              <li>
                <Link href="/abohoman" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Abohoman
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">
              Features
            </h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href="/prayukti" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Prayukti
                </Link>
              </li>
              <li>
                <Link href="/editorial" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Editorial
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 text-center md:text-left">
              Contact Us
            </h3>
            <ul className="space-y-4 text-center md:text-left">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <MapPin className="h-5 w-5 text-ingeniumbrand flex-shrink-0" />
                <span className="text-gray-600">Academy of Technology, Adisaptagram, West Bengal</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2">
                <Mail className="h-5 w-5 text-ingeniumbrand flex-shrink-0" />
                <a href="mailto:soumojitshome2021@gmail.com" className="text-gray-600 hover:text-ingeniumbrand hover:underline transition-colors duration-300">
                ingenium@aot.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Ingenium 4.0. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

