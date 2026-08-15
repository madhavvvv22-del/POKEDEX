# Pokedex

A modern, interactive Pokedex application built with React and Vite. Explore detailed information about all 1025+ Pokemon, including their stats, types, abilities, and evolution chains.

## 🌟 Features

- **Browse Pokemon**: View all 1025+ Pokemon with pagination and infinite scroll
- **Search Functionality**: Quickly find Pokemon by name or ID
- **Detailed Information**: Click on any Pokemon to view:
  - Base stats (HP, Attack, Defense, etc.)
  - Type information and effectiveness
  - Abilities and their effects
  - Evolution chain and evolution methods
  - Species information and descriptions
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile
- **Fast Performance**: Optimized data fetching and caching with Vite

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API**: [PokéAPI](https://pokeapi.co/)
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pokedex
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Usage

### Development
Start the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build
Create an optimized production build:
```bash
npm run build
```

### Preview
Preview the production build locally:
```bash
npm run preview
```

### Lint
Check code quality and style:
```bash
npm run lint
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── PokedexHeader.jsx
│   │   └── PokemonCard.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Pokedex.jsx     # Main Pokedex listing page
│   │   └── PokemonDetails.jsx
│   ├── services/           # API integration
│   │   └── pokemonAPI.js   # PokéAPI functions
│   ├── utils/              # Utility functions
│   │   ├── evolutionUtils.js
│   │   ├── pokemonTypes.js
│   │   └── pokemonUtils.js
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML entry point
├── package.json
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── vercel.json          # Vercel deployment config
```

## 🔌 API Integration

The application fetches data from the [PokéAPI](https://pokeapi.co/api/v2) with the following key endpoints:

- `/pokemon` - List of Pokemon with pagination
- `/pokemon/{id}` - Detailed Pokemon information
- `/pokemon-species/{id}` - Species data and evolution info
- `/evolution-chain/{id}` - Evolution chain details

## 🎨 Features Overview

### Pokedex Page
- Displays paginated list of all Pokemon (50 per page)
- Infinite scroll for seamless browsing
- Search bar to filter Pokemon by name or ID
- Click on any Pokemon card to view detailed information

### Pokemon Details Page
- Comprehensive stats display
- Type information with styling
- Abilities and their descriptions
- Evolution chain visualization
- Navigation to other Pokemon

## 🚀 Deployment

The project is configured for deployment on Vercel. Check `vercel.json` for deployment settings.

## 📝 Configuration

### Tailwind CSS
Global styles and Tailwind configuration are handled by `@tailwindcss/vite` plugin for optimal performance.

### ESLint
Code quality is maintained with ESLint configuration that includes:
- React and React Hooks rules
- React Refresh compatibility

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📄 License

[Add your license information here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using React and Vite**
