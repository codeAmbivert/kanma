/* eslint-disable react/display-name */
import React, { forwardRef, AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { cls } from "../../../helpers/utils";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, href, className, activeClassName }) => (
    <Link href={href} passHref>
      <div
        // style={{ borderColor: "#bf9b30" }}
        className={cls(`text-jsPrimary100 border-b-2 border-white hover:border-jsPrimary100 '
          ${className}
          ${
            activeClassName && location.pathname === href ? activeClassName : ""
          }
        `)}
        // onMouseEnter={(e) => {
        //     (e.target as HTMLAnchorElement).style.borderBottomWidth = '2px';
        //   }}
        //   onMouseLeave={(e) => {
        //     (e.target as HTMLAnchorElement).style.borderBottomWidth = '2px';
        //   }}
      >
        {children}
      </div>
    </Link>
  )
);

export default NavLink;
