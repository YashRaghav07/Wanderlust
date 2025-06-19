🌍 Wanderlust - Travel Destination Listing App
Wanderlust is a full-stack web application that allows users to explore, create, and manage travel destination listings. 
It offers features similar to platforms like Airbnb, where users can view listings with images, locations on a map, and detailed descriptions.

---

🚀 Features

>> 📝 CRUD Functionality: Users can create, edit, and delete listings.
>> 📍 Map Integration: Interactive maps with geocoding using LocationIQ or Mapbox.
>> ☁️ Image Uploads: Upload and manage images with Cloudinary.
>> 🔐 Authentication: Secure login and registration using Passport.js.
>> 🗂️ User Authorization: Users can only edit/delete their own listings.
>> 💬 Review System: Add and delete reviews for listings.
>> 📦 RESTful Routing: Clean and maintainable route structure.
>> 🎨 Responsive UI: Built with EJS, Bootstrap, and custom styles.

---

🛠️ Tech Stack

>> Frontend: HTML, CSS, Bootstrap, EJS
>> Backend: Node.js, Express.js, MongoDB, Mongoose
>> Authentication: Passport.js, express-session
>> Maps: LocationIQ (OpenLayers)
>> Image Hosting: Cloudinary
>> Templating: EJS and EJS-mate

---

💡 How to Use

1. Clone the repository
>> git clone https://github.com/your-username/wanderlust.git

2. Install dependencies
>> npm install

3. Set up your .env file with:  
>> DB_URL=your_mongodb_uri
>> CLOUDINARY_CLOUD_NAME=your_cloud_name
>> CLOUDINARY_API_KEY=your_api_key
>> CLOUDINARY_API_SECRET=your_api_secret
LocationIQ_TOKEN=your_locationiq_token

4. Start the app
>> npm run dev

---

📷 Screenshots
(Add screenshots or a short demo video link here)

---

🧠 Inspiration
This project is inspired by Colt Steele's YelpCamp concept, adapted into a travel-focused app with modern integrations.

---

📄 License
This project is licensed under the MIT License.

---

🙌 Acknowledgements
>> Colt Steele's Web Dev Bootcamp
>> LocationIQ
>> Cloudinary
>> OpenLayers



