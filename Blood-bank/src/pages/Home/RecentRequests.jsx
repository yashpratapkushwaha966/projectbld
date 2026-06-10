import { motion } from "framer-motion";
import { FaHospital, FaMapMarkerAlt, FaTint } from "react-icons/fa";

function RecentRequests() {
  const requests = [
    { group: "O+", hospital: "AIIMS Bhopal", area: "Saket Nagar", urgency: "Emergency" },
    { group: "A-", hospital: "City Hospital", area: "MP Nagar", urgency: "Urgent" },
    { group: "B+", hospital: "Life Care Hospital", area: "Rohit Nagar", urgency: "Today" },
  ];

  return (
    <section className="section light">
      <span className="badge">Live Example</span>
      <h2>Recent Blood Requests</h2>
      <div className="requestGrid">
        {requests.map((req, index) => (
          <motion.div className="requestCard" key={index} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
            <div className="bloodDrop"><FaTint /> {req.group}</div>
            <h3>{req.urgency} Blood Need</h3>
            <p><FaHospital /> {req.hospital}</p>
            <p><FaMapMarkerAlt /> {req.area}, Bhopal</p>
            <button>View Donors</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
export default RecentRequests;
