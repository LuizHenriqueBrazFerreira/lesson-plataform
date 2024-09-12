import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeBackground from '../../components/HomeBackground';
import { useTranslation } from 'react-i18next';

function Homepage() {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'EduActiva - FSMSSS';

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <main>
      <HomeBackground>
        <motion.div
          className="md:w-[60%] w-4/5 h-auto min-h-[70%] opacity-80 bg-white
          flex flex-col justify-start items-center px-[2rem] py-[3rem]
          rounded-2xl shadow-lg space-y-8"
          initial={ { opacity: 1, y: -20 } }
          animate={ { opacity: 0.9, y: 0 } }
          transition={ { duration: 0.5 } }
        >
          <motion.div
            className="text-5xl font-extrabold text-center text-gray-800"
            initial={ { opacity: 0, y: -20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.2 } }
          >
            {t("Seja bem-vindo(a)")}
          </motion.div>
          <motion.div
            className="text-2xl font-medium text-center
            text-gray-600 leading-relaxed space-y-4"
            initial={ { opacity: 0, y: -20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5, delay: 0.4 } }
          >
            <p>{t("ao Centro Horizontal de Formação,")}</p>
            <p>{t("Ensino e Aprendizagem Político-Social do")}</p>
            <p>{t("Fórum Social Mundial da Saúde e Seguridade Social")}</p>
          </motion.div>
        </motion.div>
      </HomeBackground>
      <div ref={ sectionRef }>
        <AnimatePresence>
          {isSectionVisible && (
            <motion.section
              className="flex flex-col py-4"
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              exit={ { opacity: 0, y: 20 } }
              transition={ { duration: 0.5 } }
            >
              <img
                className="self-center"
                src="/assets/infografico.png"
                alt="infográfico"
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default Homepage;
