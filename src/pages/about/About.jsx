/* eslint-disable react/no-unescaped-entities */
import HomeLink from "../../ui/HomeLink";

function About() {
  return (
    <div
      style={{
        background: "url('/images/development.png')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex items-center justify-center p-6"
    >
      <HomeLink />
      <div className="bg-white rounded-md w-[37rem] max-w-full shadow-lg my-10 shadow-black/35 p-5">
        <header className="text-center p-5 text-4xl flex flex-col gap-4">
          <h1>About this app</h1>
          <img
            src="/images/development-2.jpg"
            alt="development"
            width={580}
            height={300}
            className="object-cover rounded-md"
          />
        </header>
        <div className="flex flex-col gap-4">
          <div>
            <p>
              This is a simple web application by using React.jsx as front-end
              and Node.js as back-end.
              <br />
              The idea behind that is about using some new features of web
              developing, designing web apps and testing my skills in the
              development world.
              <br />
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-center text-2xl">App Technologies</h2>

            <ul className="flex flex-col list-disc p-5">
              <li>Styled components</li>
              <li>Tailwind CSS</li>
              <li>Redux</li>
              <li>Node.JS</li>
              <li>React.JS</li>
              <li>React Router Dom</li>
              <li>Express.JS</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Material UI</li>
            </ul>
          </div>
          <section>
            <h2 className="text-center text-2xl">About me</h2>
            My name is Amin Ebadi and i'm a fullstack web developer.
            <br />I love codding and nothing makes me happy in my life except
            codding and creating web applications.
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
