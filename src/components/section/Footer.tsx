import { StoryblokServerComponent } from "@storyblok/react/rsc";
import type { FooterGrid, FooterItemBox } from "@/.storyblok/types/288385469171144/storyblok-components";

type FooterBlocks = FooterGrid | FooterItemBox;

const Footer = async ({ blok }: { blok?: FooterBlocks[] }) => {
  if (!blok || blok.length === 0) return null;

  return (
    <footer className="w-full">
      {blok.map((item) => (
        <StoryblokServerComponent blok={item} key={item._uid} />
      ))}
    </footer>
  );
};

export default Footer;
