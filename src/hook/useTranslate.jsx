import { useSelector } from "react-redux";

const useTranslate = () => {
  const translations = useSelector((state) => state.translation.translations);    
  const t = (key) => {
    return translations?.[key] || key;
  };
  return { t };
};

export default useTranslate;
