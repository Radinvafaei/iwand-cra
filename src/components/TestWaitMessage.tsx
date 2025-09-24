import { Button } from "@shopify/polaris";
import testWaitIcon from "../assets/images/test-prepare-icon.svg";
export default function TestWaitMessage() {
  return (
    <div className="h-full flex items-center justify-center bg-white poppins">
      <div className="border border-solid border-[#E7E7F4] rounded-xl p-10 text-center mx-2">
        <img src={testWaitIcon} alt="Loading..." className="mx-auto" />
        <h1 className="!text-lg !font-bold !text-[#4A4A4A] !mb-2">
          Your AI Stylist is being prepared
        </h1>
        <p className="!text-[#4A4A4A]">
          We’re training the AI stylist on your product catalog. Once{" "}
          <br className="hidden md:block" />
          it’s ready, you’ll be able to test it here before going live.
        </p>
        <div className="bg-[#F9F9FC] p-4 rounded-lg mt-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-16">
          <div className="!font-medium">💬 Have questions or need help?</div>
          <a
            className="border border-solid border-[#272A34] rounded-lg bg-white px-4 h-8 flex items-center justify-center w-full md:w-auto text-xs font-medium"
            href="https://wa.me/491789166826"
            target="_blank"
            rel="noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
