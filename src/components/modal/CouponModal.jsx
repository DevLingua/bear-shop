import { useEffect, useState } from "react";
import shoppingBagImg from "/bag-ecommerce.png";

function CouponModal({ showModal, onClose }) {
  const [copied, setCopied] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const fetchPromoCode = async () => {
      const code = "HOLDBACK"; // Replace with actual API fetch if needed
      setPromoCode(code);
    };
    fetchPromoCode();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      // Wait 2 seconds showing "Copied!" then close modal
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <dialog
      open={showModal}
      className="fixed z-[100] top-0 h-screen w-full flex items-center justify-center bg-primary/30 backdrop-blur-sm p-4"
    >
      <article className="relative bg-white p-6 py-20 rounded-xl shadow-xl max-w-2xl w-full flex flex-col gap-10">
        {/* Close button */}
        <div className="z-100 absolute -right-1 -top-2 cursor-pointer">
          {" "}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-red-700 w-full hover:text-gray-900 text-3xl font-bold bg-purple rounded-full px-2 py-0.1 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="flex gap-4 ">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold mb-1">Wait a second...</h2>
            <p className="text-2xl w-[75%]">
              Get <span className="text-purple font-semibold">15%</span> off any
              item when you buy today!
            </p>
          </div>
          <div className="absolute -right-10 top-0">
            <img
              src={shoppingBagImg}
              alt="Shopping Bag"
              className="w-55 h-55"
            />
          </div>
        </div>

        <div className="border-2 border-dotted border-purple px-10 py-5 bg-primary/15">
          <div className="w-full h-full text-center flex flex-col gap-2">
            <p className="mb-2 text-2xl">Your code</p>
            <div className="flex items-center justify-center">
              <p className="bg-white py-2 w-fit px-15 rounded font-medium text-2xl">
                {promoCode}
              </p>
            </div>
            <p className="text-xl text-gray-600 mt-2">
              *Not valid with other discount codes
            </p>
            <div className="flex justify-center items-center">
              <button
                onClick={handleCopy}
                className="mt-4 px-4 py-2 w-fit rounded-[0.5rem] bg-purple text-white hover:bg-purple/90"
                disabled={copied}
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </article>
    </dialog>
  );
}

export default CouponModal;
