import { Link } from "react-router-dom";

export default function Homepage() {
  const footerLinks = [
    "About",
    "Download the X app",
    "Help Centre",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads info",
    "Blog",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "X for Business",
    "Developers",
    "Directory",
    "Settings",
  ];

  return (
    <div className="min-h-screen">
      <div className="flex h-[80%] ">
        <div className="flex-1">
          <img src="/x-social-media-logo-icon.svg" alt="" className=" " />
        </div>
        <div className="flex-1  mt-20">
          <div>
            <h1 className="w-[543px] h-[76px] text-[64px] font-bold mb-20">
              Happening now
            </h1>
            <p className="text-[31px] w-[185px] h-[36px] font-bold mb-10">
              {" "}
              Join Today.
            </p>

            <button className="w-[300px] h-[38px] text-[15px] bg-blue-500 rounded-full px-[16px] m-[2px] font-semibold ">
              Create Account
            </button>
            <p className="text-[11px] my-1 text-gray-500 w-[300px] h-[24px]">
              By signing up, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span> and{" "}
              <span className="text-blue-500">Privacy Policy</span>, including{" "}
              <span className="text-blue-500">Cookie Use.</span>
            </p>
          </div>
          <div>
            <h2 className="text-[17px] font-bold mt-20 mb-5">
              Already have an account?
            </h2>
            <button className="w-[300px] h-[38px] text-[15px] text-blue-500 border border-gray-200 rounded-full px-[16px]  font-semibold">
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="flex text-gray-400 gap-[11px] text-[13px] justify-center">
        {footerLinks.map((item, index) => (
          <Link to="/" key={index}>
            {item}
          </Link>
        ))}
      </div>
      <p className="text-gray-400 gap-[11px] text-[13px] text-center">© 2025 X Corp.</p>
    </div>
  );
}
