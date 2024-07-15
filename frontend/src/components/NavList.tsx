import { Typography } from '@material-tailwind/react';
import { useTranslation } from "react-i18next";

export default function NavList() {
    const { t } = useTranslation();
    return (
            <ul
              className="mt-2 p-4 lg:p-0 bg-white border-2 lg:border-none
              lg:flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
            >
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium text-xl"
              >
                <a
                  href="/courses"
                  className="flex items-center justify-center
                 hover:text-blue-500 transition-colors"
                >
                  {t("Meus Cursos")}
                </a>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium text-xl"
              >
                <a
                  href="/bookmarked"
                  className="flex items-center justify-center hover:text-blue-500 transition-colors"
                >
                  {t("Cursos Salvos")}
                </a>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium text-xl"
              >
                <a
                  href="/profile"
                  className="flex items-center justify-center hover:text-blue-500 transition-colors"
                >
                  {t("Meu Perfil")}
                </a>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium text-xl"
              >
                <a
                  href="/"
                  className="flex items-center justify-center hover:text-blue-500 transition-colors"
                  onClick={ () => localStorage.clear() }
                >
                  {t("Sair")}
                </a>
              </Typography>
            </ul>
          );
};