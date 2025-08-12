# AttendanceApp - Employee Attendance Management

A comprehensive React Native attendance management application built with Cursor's dark theme design aesthetic. This app provides full attendance tracking, leave management, and admin capabilities for modern workplaces.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Installation

1. **Clone or download the project files**
2. **Install dependencies:**
```bash
cd attendance-app
npm install
```

3. **Install Expo CLI globally:**
```bash
npm install -g @expo/cli
```

4. **Start the development server:**
```bash
npm start
```

5. **Run on your preferred platform:**
```bash
# Android
npm run android

# iOS  
npm run ios

# Web
npm run web
```

## 📱 Features

### Employee Features
✅ **Authentication System** - Secure login with employee ID  
✅ **Real-time Dashboard** - Live clock, quick actions, weekly summary  
✅ **Check-In/Out System** - GPS location tracking, face recognition placeholder  
✅ **Attendance History** - Calendar views, status tracking  
✅ **Leave Management** - Apply for leave, track balances, view history  
✅ **Profile Management** - Personal info, settings, statistics  

### Manager Features 
✅ **Team Dashboard** - Monitor team attendance and performance  
✅ **Leave Approvals** - Review and approve/reject applications  
✅ **Team Reports** - Generate comprehensive reports  
✅ **Analytics** - Visual insights into team productivity  

### Admin Features
✅ **System Administration** - Full access to all features  
✅ **Employee Management** - Add, edit, manage employee records  
✅ **Company Settings** - Configure policies, holidays, working hours  
✅ **Advanced Analytics** - System-wide attendance insights  

### Technical Features
✅ **Cross-platform** - iOS, Android, Web support via Expo  
✅ **Dark Theme** - Cursor-inspired modern UI  
✅ **Offline Capability** - Core functions work without internet  
✅ **Real-time Updates** - Live attendance status  
✅ **Responsive Design** - Works on mobile, tablet, desktop  

## 🎨 Design System (Cursor Theme)

### Color Palette
- **Primary**: Deep blacks (#000000, #1a1a1a) 
- **Secondary**: Grays (#2a2a2a, #8e8e93)
- **Accents**: Blue (#007aff), Green (#34c759)
- **Status Colors**: Present (#34c759), Late (#ff9500), Absent (#ff3b30)

### Typography
- **Font Family**: Inter (system fallback)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## 🔑 Demo Accounts

### Employee Account
- **ID**: `EMP001`
- **Password**: `password123`
- **Role**: Employee (Sarah Johnson)

### Manager Account  
- **ID**: `EMP002`
- **Password**: `manager123`
- **Role**: Manager (Michael Chen)

### Admin Account
- **ID**: `ADMIN001`
- **Password**: `admin123`  
- **Role**: Admin (David Wilson)

## 🛠 Deployment with Codemagic

This project is pre-configured for automated CI/CD deployment using Codemagic.

### Setup Steps:

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/attendance-app.git
git push -u origin main
```

2. **Connect to Codemagic:**
   - Go to [codemagic.io](https://codemagic.io)
   - Sign up/login with your GitHub account
   - Add your repository
   - Select "React Native App" as project type

3. **Configure Environment Variables:**

**For Android:**
- `GOOGLE_PLAY_SERVICE_ACCOUNT_CREDENTIALS`
- Upload your Android keystore file

**For iOS:**
- `APP_STORE_CONNECT_KEY_IDENTIFIER`
- `APP_STORE_CONNECT_PRIVATE_KEY` 
- `APP_STORE_CONNECT_ISSUER_ID`

4. **Start Build:**
   - The `codemagic.yaml` file automatically configures builds
   - Push to `main` or `develop` branch to trigger builds
   - Monitor builds in Codemagic dashboard

## 📁 Project Structure

```
attendance-app/
├── App.js                      # Main entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── babel.config.js             # Babel configuration
├── metro.config.js             # Metro bundler configuration
├── codemagic.yaml              # CI/CD configuration
├── README.md                   # Project documentation
├── .gitignore                  # Git ignore rules
├── assets/                     # Images, icons, fonts
│   ├── icon.png                # App icon (1024x1024)
│   ├── splash.png              # Splash screen
│   ├── adaptive-icon.png       # Android adaptive icon
│   └── favicon.png             # Web favicon
└── src/                        # Source code
    ├── components/             # Reusable UI components
    ├── screens/                # Application screens
    │   ├── LoadingScreen.js
    │   ├── LoginScreen.js
    │   ├── DashboardScreen.js
    │   ├── CheckInOutScreen.js
    │   ├── AttendanceScreen.js
    │   ├── AttendanceHistoryScreen.js
    │   ├── LeaveScreen.js
    │   ├── LeaveApplicationScreen.js
    │   ├── ProfileScreen.js
    │   ├── AdminDashboardScreen.js
    │   └── ManagerDashboardScreen.js
    ├── navigation/             # Navigation configuration  
    │   ├── AuthNavigator.js
    │   └── MainNavigator.js
    ├── context/                # React Context providers
    │   ├── AuthContext.js
    │   └── DataContext.js
    ├── constants/              # App constants and themes
    │   ├── Colors.js
    │   └── Fonts.js
    └── utils/                  # Helper functions
        ├── dateUtils.js
        └── validationUtils.js
```

## 🚀 Getting Started for Development

1. **Environment Setup:**
   - Install Node.js 18+
   - Install Expo CLI: `npm install -g @expo/cli`
   - For Android: Install Android Studio
   - For iOS: Install Xcode (macOS only)

2. **Project Setup:**
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android  # Android
npm run ios      # iOS
npm run web      # Web browser
```

3. **Testing the App:**
   - Use the demo accounts listed above
   - Test all role-based features (Employee, Manager, Admin)
   - Verify attendance check-in/out functionality
   - Test leave application and approval workflows

## 🔧 Development Tips

### Adding New Screens
1. Create screen file in `src/screens/`
2. Add navigation route in appropriate navigator
3. Import and use context hooks for data access

### Customizing Themes
- Colors: Modify `src/constants/Colors.js`
- Fonts: Update `src/constants/Fonts.js`
- Apply changes throughout component stylesheets

### Adding New Features
1. Update data models in `DataContext.js`
2. Create new screen components
3. Add navigation routes
4. Update role-based access in `MainNavigator.js`

## 🛡 Security Features

- **Role-based Access Control**: Different interfaces for Employee/Manager/Admin
- **Secure Authentication**: Password-based login with session management
- **Data Validation**: Input validation on all forms
- **Location Verification**: GPS-based attendance tracking
- **Audit Trail**: All attendance and leave actions are logged

## 📊 Mock Data

The app includes comprehensive mock data for testing:
- **Employees**: Multiple users with different roles
- **Attendance Records**: Historical attendance data
- **Leave Applications**: Sample leave requests with various statuses
- **Company Settings**: Configurable policies and holidays

## 🎯 Production Deployment

### iOS Deployment
1. Configure iOS certificates in Codemagic
2. Set up App Store Connect API key
3. Push to trigger automated build
4. App automatically submitted to TestFlight

### Android Deployment  
1. Generate signed keystore
2. Configure Google Play Service Account
3. Upload keystore to Codemagic
4. Push to trigger automated build and Play Store upload

## 📞 Support

For issues and questions:
- **GitHub Issues**: [Create an issue](https://github.com/your-username/attendance-app/issues)
- **Email**: support@techcorp.com
- **Documentation**: Check this README and inline code comments

## 📄 License

MIT License - feel free to modify and use for your projects.

---

**Built with ❤️ using React Native, Expo, and Cursor's design inspiration**