import { StoryblokServerComponent } from "@storyblok/react/rsc";
import Image from "next/image";
import type { Menu } from "@/.storyblok/types/288385469171144/storyblok-components";
import LanguageSwitcher from "../ui/language-switcher";

// Correctly type header_logo as StoryblokAsset
type HeaderProps = {
  burger_menu?: Menu[];
  header_logo?: StoryblokAsset; // Ensure correct type here
};

const Header = ({ burger_menu, header_logo }: HeaderProps) => {
  return (
    <header className="header-wrapper">
      {header_logo && (
        <a href="/" className="header-logo">
          <figure>
            <Image
              src={header_logo.filename}
              alt={header_logo.alt || "Site logo"}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "132px",
              }}
            />
          </figure>
        </a>
      )}
      {burger_menu && (
        <nav className="menu-box">
          <StoryblokServerComponent blok={burger_menu[0]} />
        </nav>
      )}
      <LanguageSwitcher className="global-language-switcher" />
    </header>
  );
};

export default Header;
