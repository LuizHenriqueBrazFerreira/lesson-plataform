import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="w-screen h-[85vh] flex justify-center items-center">
      404 - {t("Página não encontrada")}
    </div>
  );
}

export default NotFound;
