import { isLocalEnv } from "../config";
import dayjs from "dayjs";

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const doPasswordsMatch = (password, repeatedPassword) => {
  return password === repeatedPassword;
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[\d\s\-()+]+$/;
  return phoneRegex.test(phoneNumber);
};

const queryClientConfig = {
  defaultOptions: {
    queries: {
      // retry: (failureCount, error) => {
      //   if (failureCount > MAX_RETRIES_QUERY_RETRY) {
      //     return false;
      //   }

      //   if (isAxiosError(error) && HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
      //     // console.log(`Aborting retry due to ${error.response?.status} status`);
      //     return false;
      //   }

      //   return true;
      // },
      retry: 0,
      // This just tells react-query to run offline without internet in dev mode
      networkMode: isLocalEnv ? "offlineFirst" : "online" // or 'always'
    }
  }
};

const scrollToElementIfNeeded = (element) => {
  if (element) {
    const rect = element.getBoundingClientRect();

    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const formatTime = (timer) => {
  if (typeof timer !== "number" || isNaN(timer) || timer < 0) {
    return "0:00";
  }

  const minutes = Math.floor(timer / 60);
  const seconds = Math.floor(timer % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formatDateAndTime = (dateString) => dayjs(dateString).format("DD MMMM YYYY, HH:mm");

const debounce = (func, timeout = 800) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const formatDate = (dateString) => dayjs(dateString).format("DD MMMM YYYY");

const shuffleArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

function capitalizeEachWord(string) {
  return string
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
}

export {
  queryClientConfig,
  uploadImage,
  isValidEmail,
  isStrongPassword,
  doPasswordsMatch,
  isValidPhoneNumber,
  scrollToElementIfNeeded,
  scrollToTop,
  formatTime,
  formatDateAndTime,
  debounce,
  getInitials,
  formatDate,
  shuffleArray,
  capitalizeEachWord
};
