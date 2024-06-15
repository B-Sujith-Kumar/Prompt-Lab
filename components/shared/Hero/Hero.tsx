import Image from "next/image";
import HeroImage from "../../../public/images/HeroImage.webp";
import Planet from "../../../public/images/blue-planet.avif";
import Link from "next/link";
import "./hero.css";

const Hero = () => {
  return (
    <main>
      <section className="bg-img gradient-container bg-pos">
        <div className="flex pl-32 gap-x-20 items-start h-auto max-[1130px]:pl-12 max-lg:gap-x-6 max-lg:items-center max-md:flex-col max-md:gap-y-10 max-md:px-4">
          <div className="flex flex-col gap-y-8 justify-center basis-1/2 pt-24 max-md:pt-10">
            <h1 className="text-white text-4xl font-montserrat leading-normal font-bold max-lg:text-3xl max-md:text-center max-md:text-4xl max-md:leading-relaxed max-sm:text-3xl max-sm:leading-relaxed">
              Discover, Craft, and Exchange AI Prompts at PromptLab
            </h1>
            <p className="text-white font-worksans leading-loose text-xl font-light max-lg:text-lg max-lg:hidden max-md:hidden max-md:text-center max-sm:text-base">
              Unlock creativity with AI-generated prompts! Writers, developers,
              and curious minds, find inspiration at PromptLab. Join our
              community and share your own prompts today!
            </p>
            <p className="text-white font-worksans text-xl font-light leading-8 max-lg:text-lg lg:hidden max-md:block max-md:text-center max-sm:text-base max-sm:leading-relaxed">
              Unlock creativity with AI-generated prompts! Writers, developers,
              and curious minds, find inspiration at PromptLab. Join our
              community and share your own prompts today!
            </p>
            <Link
              href="#prompts"
              className="text-white font-worksans text-lg bg-btn-primary w-60 text-center py-3 rounded-md font-semibold max-md:w-full"
            >
              Explore Prompts
            </Link>
          </div>
          <div className="basis-1/2 pt-20 max-md:pt-0 shrink-0 max-md:w-full">
            <div className="fade">
              <Image
                src={HeroImage}
                className="rounded-md w-full box-shadow"
                width={500}
                alt="Hero"
              />
              <Image
                src={Planet}
                className="relative bottom-16 right-16 -z-10"
                width={100}
                alt="Planet"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="#prompts" className="md:mt-8">
        <div className="pl-32 max-[1130px]:pl-12 max-md:px-4">
          <h2 className="text-white text-2xl font-montserrat leading-normal font-bold max-lg:text-2xl  max-md:text-2xl max-md:leading-relaxed max-sm:text-2xl max-sm:leading-relaxed">
            Explore prompts from different platforms
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Hero;
