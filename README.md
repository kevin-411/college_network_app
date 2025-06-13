# College Network Platform

A comprehensive social networking platform designed specifically for college students to connect, share resources, and collaborate across academic institutions.

## 🎯 Features

### Core Functionality
- **User Authentication**: Secure login/signup with email verification
- **Social Timeline**: Share posts, ask questions, create study groups
- **Messaging System**: Real-time private messaging between students
- **Global Search**: Find students, posts, and content across the network
- **College News**: Official announcements and news from institutions
- **Study Marketplace**: Buy/sell textbooks and study materials
- **Resource Sharing**: Upload and share study materials
- **Admin Panel**: Complete moderation and management tools

### Advanced Features
- **Rich Text Editor**: Enhanced post creation with formatting
- **Real-time Notifications**: Stay updated with platform activity
- **Mobile-First Design**: Responsive across all devices
- **Advanced Filtering**: Search by college, tags, date, and content type
- **User Verification**: Admin-managed verification system
- **Analytics Dashboard**: Comprehensive platform statistics

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kevin-411/college-network-platform.git
   cd college-network-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

**Student Account:**
- Email: Any valid email
- Password: Any password

**Admin Account:**
- Email: `admin@collegeNetwork.edu`
- Password: `admin123`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Admin/           # Admin panel components
│   ├── Auth/            # Authentication forms
│   ├── CollegeNews/     # News and announcements
│   ├── Layout/          # Header, navigation
│   ├── Marketplace/     # Buy/sell marketplace
│   ├── Messages/        # Messaging system
│   ├── Profile/         # User profiles
│   ├── Resources/       # Study resources
│   ├── Search/          # Search functionality
│   └── Timeline/        # Social timeline
├── context/             # React context providers
├── data/                # Mock data and types
├── store/               # Zustand state management
├── test/                # Test files
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🏗 Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🚀 Deployment

### Frontend Deployment Options

**Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

**Netlify**
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

**Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Backend Integration

For production deployment, integrate with:

**Database Options:**
- Supabase (PostgreSQL)
- Firebase Firestore
- MongoDB Atlas
- PlanetScale (MySQL)

**Authentication:**
- Supabase Auth
- Firebase Auth
- Auth0
- Custom JWT implementation

**File Storage:**
- Cloudinary
- AWS S3
- Firebase Storage

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication
VITE_JWT_SECRET=your_jwt_secret

# File Upload
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 📱 Mobile App

The platform is fully responsive and works as a Progressive Web App (PWA). For native mobile apps, consider:

- React Native implementation
- Expo managed workflow
- Capacitor for hybrid apps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure responsive design
- Maintain accessibility standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Email: support@collegenetwork.edu
- Documentation: [docs.collegenetwork.edu](https://docs.collegenetwork.edu)

## 🎉 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- All contributors and beta testers

---

**Built with ❤️ for the college community**