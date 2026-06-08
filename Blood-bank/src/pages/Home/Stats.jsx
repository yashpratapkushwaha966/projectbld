import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return count.toLocaleString();
}

function Stats() {
  const data = [
    { end: 48920, label: "Registered Donors" },
    { end: 120, label: "Hospitals Connected" },
    { end: 37612, label: "People Helped" },
    { end: 50, label: "Cities Active" },
  ];

  return (
    <section className="stats">
      {data.map((item, index) => (
        <motion.div
          className="statCard"
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10, scale: 1.03 }}
        >
          <h2>
            <Counter end={item.end} />+
          </h2>
          <p>{item.label}</p>
        </motion.div>
      ))}
    </section>
  );
}

export default Stats;