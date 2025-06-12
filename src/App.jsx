import { useState, useEffect, useRef, useContext } from "react";
import Routes from "./Routes";
import CouponModal from "./components/modal/CouponModal";
import { CartContext } from "./context/CartContext";

const FIRST_SHOW_DELAY = 10 * 1000; // 10 seconds delay before first show
const SECOND_SHOW_DELAY = 2 * 60 * 1000; // 2 minutes delay before second show
const STORAGE_KEY = "couponModalShownCount";

function App() {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);
  const shownCount = useRef(0);
  const { cart } = useContext(CartContext); // Use the cart context

  // Helper to get shown count from localStorage
  const getShownCount = () => {
    const count = localStorage.getItem(STORAGE_KEY);
    return count ? parseInt(count, 10) : 0;
  };

  // Schedule modal display with cooldown logic
const scheduleModal = () => {
  if (timerRef.current) clearTimeout(timerRef.current);

  shownCount.current = getShownCount();

  if (shownCount.current < 2) {
    if (shownCount.current === 0) {
      // First time, show after 10s
      timerRef.current = setTimeout(() => {
        setShowModal(true);
      }, FIRST_SHOW_DELAY);
    } else if (shownCount.current === 1) {
      // Second time, check cart items every second
      const intervalId = setInterval(() => {
        if (cart.length > 0) {
          clearInterval(intervalId);
          timerRef.current = setTimeout(() => {
            setShowModal(true);
          }, SECOND_SHOW_DELAY);
        }
      }, 1000);
    }
  }
};

  // Close modal and set cooldown timestamp
  const closeModal = () => {
    setShowModal(false);
    shownCount.current += 1;
    localStorage.setItem(STORAGE_KEY, shownCount.current.toString());
  };

  useEffect(() => {
    scheduleModal();

    // Cleanup on unmount
    return () => clearTimeout(timerRef.current);
  }, [cart]);

  return (
    <>
      <Routes />
      {showModal && <CouponModal showModal={showModal} onClose={closeModal} />}
    </>
  );
}

export default App;

