function HospitalPreview() {
  const hospitals = [
    "AIIMS Bhopal",
    "City Blood Bank",
    "Life Care Hospital"
  ];

  return (
    <section className="section">
      <span className="badge">Hospitals</span>
      <h2>Connected Hospitals</h2>

      <div className="hospitalGrid">
        {hospitals.map((hospital, index) => (
          <div className="hospitalCard" key={index}>
            <h3>{hospital}</h3>
            <p>Fresh & Frozen Blood Available</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HospitalPreview;