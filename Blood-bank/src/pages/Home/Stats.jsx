import { motion } from "framer-motion";

function Stats() {
  const data = [
    ["48,920+", "Registered Donors"],
    ["120+", "Hospitals Connected"],
    ["37,612+", "People Helped"],
    ["50+", "Cities Active"],
  ];

  return (
    <section className="stats">
      {data.map((item, index) => (
        <motion.div className="statCard" key={index}>
          <h2>{item[0]}</h2>
          <p>{item[1]}</p>
        </motion.div>
      ))}
    </section>
  );
}

export default Stats;