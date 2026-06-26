const indiaData = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", 
    "Kakinada", "Tirupati", "Anantapur", "Kadapa", "Vizianagaram", 
    "Eluru", "Ongole", "Chittoor", "Machilipatnam", "Srikakulam"
  ],
  "Arunachal Pradesh": [
    "Itanagar", "Tawang", "Ziro", "Pasighat", "Along", 
    "Bomdila", "Tezu", "Khonsa", "Changlang", "Roing"
  ],
  "Assam": [
    "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", 
    "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Karimganj", 
    "Sivasagar", "Goalpara", "Barpeta", "Diphu"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", 
    "Darbhanga", "Ara", "Begusarai", "Katihar", "Munger", 
    "Chhapra", "Nalanda", "Jehanabad", "Arrah", "Saharsa"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", 
    "Jagdalpur", "Ambikapur", "Dhamtari", "Raigarh", "Durg"
  ],
  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", 
    "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", 
    "Morbi", "Bharuch", "Valsad", "Vapi", "Bhuj", "Porbandar"
  ],
  "Haryana": [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Yamunanagar", 
    "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", 
    "Sirsa", "Bhiwani", "Bahadurgarh", "Jind"
  ],
  "Himachal Pradesh": [
    "Shimla", "Manali", "Dharamshala", "Kullu", "Mandi", 
    "Solan", "Hamirpur", "Chamba", "Una", "Bilaspur", "Kangra"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", 
    "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chaibasa"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", 
    "Davangere", "Ballari", "Tumakuru", "Shivamogga", "Kalaburagi", 
    "Udupi", "Hassan", "Bidar", "Chikkamagaluru", "Vijayapura"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", 
    "Alappuzha", "Palakkad", "Kottayam", "Malappuram", "Kannur", 
    "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad"
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", 
    "Sagar", "Satna", "Rewa", "Katni", "Sehore", 
    "Vidisha", "Hoshangabad", "Raisen", "Dewas", "Ratlam", 
    "Khandwa", "Chhindwara", "Betul", "Shivpuri", "Singrauli"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", 
    "Aurangabad", "Solapur", "Amravati", "Navi Mumbai", "Kolhapur", 
    "Akola", "Jalgaon", "Chandrapur", "Nanded", "Sangli", "Satara"
  ],
  "Manipur": [
    "Imphal", "Churachandpur", "Thoubal", "Ukhrul", "Senapati", "Chandel"
  ],
  "Meghalaya": [
    "Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar"
  ],
  "Mizoram": [
    "Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"
  ],
  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", 
    "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", 
    "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Abohar", "Phagwara"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Ajmer", "Udaipur", 
    "Bikaner", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar", 
    "Bharatpur", "Pali", "Barmer", "Jaisalmer"
  ],
  "Sikkim": [
    "Gangtok", "Namchi", "Geyzing", "Mangan"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", 
    "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thanjavur", 
    "Tuticorin", "Nagercoil", "Kanchipuram", "Dindigul"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", 
    "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"
  ],
  "Tripura": [
    "Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Ambassa"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Prayagraj", "Varanasi", "Agra", 
    "Noida", "Ghaziabad", "Meerut", "Bareilly", "Aligarh", 
    "Moradabad", "Saharanpur", "Gorakhpur", "Jhansi", "Muzaffarnagar", 
    "Mathura", "Ayodhya", "Mirzapur", "Firozabad", "Rampur"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Haldwani", "Rishikesh", "Roorkee", 
    "Nainital", "Rudrapur", "Kashipur", "Pithoragarh", "Almora"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", 
    "Bardhaman", "Malda", "Baharampur", "Kharagpur", "Haldia", 
    "Jalpaiguri", "Darjeeling", "Purulia", "Kalyani"
  ],
  "Andaman and Nicobar Islands": [
    "Port Blair", "Diglipur", "Mayabunder"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman", "Diu", "Silvassa"
  ],
  "Delhi": [
    "New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi",
    "Dwarka", "Rohini", "Connaught Place", "Karol Bagh"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", 
    "Udhampur", "Samba", "Poonch", "Rajouri", "Kupwara"
  ],
  "Ladakh": [
    "Leh", "Kargil"
  ],
  "Lakshadweep": [
    "Kavaratti", "Agatti", "Amini"
  ],
  "Puducherry": [
    "Puducherry", "Karaikal", "Mahe", "Yanam"
  ]
};

export default indiaData;