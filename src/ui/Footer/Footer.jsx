import FooterLinks from "./FooterLinks";
import FooterList from "./FooterList";

function Footer() {
  return (
    <footer className="flex flex-col px-6 bg-white border-t-2 border-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:py-10 p-4 grid-rows-[170px_1fr_1fr_100px] sm:grid-rows-2 md:grid-rows-[auto] gap-2 border-b-2 border-gray- w-full m-0">
        <FooterList
          headingTitle="About"
          className="flex flex-col justify-start"
          items={[
            "This is a simple website to testing my skills. the features of that is all about creating post, updating, deleting, liking, sending comment on that and authentication.",
          ]}
        />

        <FooterList
          headingTitle="Company"
          items={[
            "About Us",
            "Careers",
            "Customer Stories",
            "Legal",
            "Contact",
            "Press Kit",
          ]}
        />

        <FooterList
          headingTitle="Solutions"
          items={[
            "Agencies",
            "Freelancers",
            "High-Traffic Websites",
            "WooCommerce",
          ]}
        />
        <FooterLinks />
      </div>
      <section className="h-full p-4">
        <p className="text-gray-800 text-center ">
          Made with love in IRI &copy; 2024
        </p>
      </section>
    </footer>
  );
}

export default Footer;
