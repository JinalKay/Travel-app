# 🌍 Travel Destination Explorer

An interactive and visually appealing web application that allows users to discover random countries, view curated images, learn about destinations, and maintain a personal travel wishlist. It also features continent-based filtering, dark mode, a country search bar, best time to visit info, and a fun flag-guessing game.

---

## ✨ Features

- 🔀 **Random Destination Discovery** – Get a random country with its flag, images, capital, population, timezones.
- 🌐 **Region Filter** – Filter your wishlist by continent (Africa, Americas, Asia, Europe, Oceania).
- 🔍 **Search by Country** – Quickly search and view any country.
- 🌓 **Dark Mode Toggle** – Switch between light and dark themes.
- 🗓️ **Best Time to Visit** – Suggested travel seasons for popular destinations.
- 🖼️ **Image Carousel** – Stunning visuals from Unsplash API.
- ❤️ **Wishlist** – Add destinations you love and view them later.
- 💾 **Persistent Storage** – Wishlist stored in localStorage.
- 🎮 **Mini Travel Quiz** – Guess the country by flag in a fun game format.

---

## 🚀 Tech Stack

- **Frontend**: React.js
- **APIs**:
  - [REST Countries API](https://restcountries.com/)
  - [Unsplash API](https://unsplash.com/developers)
- **State Management**: React Hooks
- **Styling**: Custom CSS with light/dark themes
- **Persistence**: LocalStorage
- **Libraries**: Axios, React Responsive Carousel

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/JinalKay/Travel-app.git
cd Travel-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create a .env file in the root directory:
bash
Copy
Edit
REACT_APP_UNSPLASH_KEY=your_unsplash_access_key_here
Get your Unsplash Access Key from: https://unsplash.com/developers

4. Run the App
bash
Copy
Edit
npm start
The app will launch at http://localhost:3000.

📁 Folder Structure
pgsql
Copy
Edit
src/
├── components/
│   ├── DestinationCard.js
│   ├── Wishlist.js
│   └── Game.js
├── App.js
├── index.js
├── index.css
├── .env

📌 Future Improvements
🌍 Support for more detailed country info (languages, currency, maps)

📲 Mobile-friendly animations and gestures

🧠 New game modes (e.g., capital guessing, population ranges)

🌐 Multilingual support

🔐 Optional login for wishlist sync

👩‍💻 Author
Made with 💙 by Jinal Kapadiya

