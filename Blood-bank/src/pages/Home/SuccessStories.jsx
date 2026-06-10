import { motion } from "framer-motion";

function SuccessStories() {
  const stories = [
    { text: "Project BLD makes emergency blood donor search simple and fast.", name: "Mission" },
    { text: "Every donor registration can become a lifesaving contact for someone in need.", name: "Impact" },
    { text: "We focus on verified donors, consent and local city based help.", name: "Trust" }
  ];

  return (
    <section className="section light">
      <span className="badge">Why Project BLD</span>
      <h2>Built For Real Emergency Help</h2>
      <div className="cardGrid">
        {stories.map((story, index) => (
          <motion.div className="storyCard" key={index} whileHover={{ y: -8 }} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p>“{story.text}”</p>
            <h3>{story.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default SuccessStories;
