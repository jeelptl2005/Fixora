import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at center, #ffffff 0%, #eef3fc 100%)",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "3px solid transparent",
                borderTop: "3px solid #1e80f0",
                borderRight: "3px solid #ff6b00",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 12,
                borderRadius: "50%",
                border: "2px solid transparent",
                borderBottom: "2px solid #1e80f0",
                borderLeft: "2px solid #ff6b00",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1e80f0, #ff6b00)",
              }}
              animate={{ scale: [1, 0.8, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              style={{
                position: "absolute",
                inset: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔧
            </motion.div>
          </div>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: "30%",
              fontSize: 13,
              fontWeight: 600,
              color: "#1e80f0",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Fixora
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;