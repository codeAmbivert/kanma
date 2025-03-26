"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t-2 border-jsPrimary100 mt-20">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 custom_sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Deals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Kanma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
