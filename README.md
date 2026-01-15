# Professional Counseling Services Website

A production-ready, responsive website for a therapist practice built with React, Vite, and Tailwind CSS. Content is dynamically loaded from Google Sheets, allowing non-technical updates without redeployment.

## 🌟 Features

- **Dynamic Content Management** - All content loaded from Google Sheets via public JSON endpoint
- **Robust Fallback System** - Local JSON fallback if Google Sheets fails to load
- **Responsive Design** - Mobile-first design that works on all devices
- **Accessible** - WCAG AA compliant with semantic HTML and ARIA labels
- **Production Ready** - Security features including XSS prevention and content sanitization
- **GitHub Pages Deployment** - Automated deployment via GitHub Actions
- **Professional Styling** - Clean, calm aesthetic suitable for therapy practice

## 📋 Table of Contents

- [Local Development Setup](#local-development-setup)
- [Google Sheets Configuration](#google-sheets-configuration)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Content Update Workflow](#content-update-workflow)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🚀 Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd simpson
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Google Sheets URL (optional for local development):
   ```
   VITE_SHEET_URL=your_google_sheet_url_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📊 Google Sheets Configuration

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it (e.g., "Website Content")

### Step 2: Set Up Sheet Structure

Your Google Sheet should have the following structure. See `GOOGLE_SHEET_TEMPLATE.md` for detailed examples.

#### Tab 1: site_meta
Columns: `key` | `value`

Example rows:
```
key              | value
siteTitle        | Professional Counseling Services
phone            | (555) 123-4567
email            | contact@example.com
address          | 6065 Lake Forrest Drive NW, Suite 250, Sandy Springs, GA 30328
```

#### Tab 2: pages
Columns: `page` | `section` | `field` | `value` | `order`

Example rows:
```
page  | section | field       | value                                    | order
home  | hero    | headline    | Find Balance. Discover Healing.          | 1
home  | hero    | subheadline | Experiential therapy for healing         | 2
about | intro   | content     | I am an experiential therapist...        | 1
```

### Step 3: Publish Your Sheet

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. Choose which tab to publish (start with the first tab)
3. Select **Web page** format
4. Click **Publish**
5. Copy the published URL

### Step 4: Get the Sheet ID

From the URL, extract the Sheet ID:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit#gid=0
```

The content loader will automatically convert this to a CSV export URL.

### Step 5: Configure Environment Variable

#### For Local Development:
Add to `.env`:
```
VITE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0
```

#### For GitHub Pages:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `VITE_SHEET_URL`
5. Value: Your Google Sheets URL
6. Click **Add secret**

## 🚀 Deployment to GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### Step 2: Configure Repository

The repository is already configured with:
- `.github/workflows/deploy.yml` - Automated deployment workflow
- `vite.config.js` - Correct base path (`/flowersflowerseverywhere/`)

### Step 3: Push to Main Branch

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

### Step 4: Monitor Deployment

1. Go to **Actions** tab in your GitHub repository
2. Watch the deployment workflow run
3. Once complete, your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/simpson/
   ```

### Step 5: Verify Deployment

Visit your site and verify:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Images display properly
- ✅ Content loads from Google Sheets (or fallback if not configured)

## 📝 Content Update Workflow

### For Non-Technical Users

1. **Open your Google Sheet**
2. **Edit the content** directly in the spreadsheet
3. **Save** (Google Sheets auto-saves)
4. **Refresh your website** in the browser
5. Content updates appear immediately! ✨

**No redeployment needed!** The website fetches fresh content from Google Sheets on each page load.

### Content Guidelines

- **Text Content**: Edit directly in the `value` column
- **Images**: 
  - Use relative paths for local images: `images/about/photo.jpg`
  - Or use full URLs for externally hosted images
  - Images must be in the `/public/images/` folder (for local images)
- **Order**: Use the `order` column to control display sequence
- **Special Characters**: Avoid using pipe (`|`) or quotes that aren't closed

### Testing Changes

1. Make your edits in Google Sheets
2. Wait 30-60 seconds for Google's cache to update
3. Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

## 📁 Project Structure

```
simpson/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   └── images/                 # Static images
│       ├── about/
│       ├── approach/
│       ├── contactFAQ/
│       ├── main/
│       └── services/
├── src/
│   ├── components/             # Reusable React components
│   │   ├── DynamicImage.jsx
│   │   ├── FAQItem.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── ServiceCard.jsx
│   ├── content/                # Content management
│   │   ├── contentLoader.js    # Google Sheets integration
│   │   └── fallback-content.json
│   ├── pages/                  # Page components
│   │   ├── About.jsx
│   │   ├── Approach.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   └── Services.jsx
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── .env.example                # Environment variables template
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Google Sheets URL (optional - uses fallback if not provided)
VITE_SHEET_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit
```

**Note**: The `VITE_` prefix is required for Vite to expose the variable to the client.

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    // Your custom colors here
  }
}
```

### Fonts

Edit `index.html` to change Google Fonts, then update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your-Font', 'system-ui', 'sans-serif'],
  serif: ['Your-Serif', 'Georgia', 'serif'],
}
```

### Base Path

If deploying to a different path, edit `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-path/',  // Change this
})
```

## 🐛 Troubleshooting

### Content Not Loading from Google Sheets

1. **Check the URL**: Ensure `VITE_SHEET_URL` is set correctly
2. **Verify Publishing**: Make sure the sheet is published to the web
3. **Check Console**: Open browser DevTools → Console for error messages
4. **Test Fallback**: The site should work with fallback content if sheets fail

### Images Not Displaying

1. **Check Path**: Ensure image paths in Google Sheets are correct
2. **Verify Files**: Confirm images exist in `/public/images/`
3. **Case Sensitivity**: File names are case-sensitive on deployment
4. **Format**: Use web-friendly formats (jpg, png, webp, avif)

### Build Errors

1. **Clear Cache**: 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node Version**: Requires Node 18+
   ```bash
   node --version
   ```

### Deployment Issues

1. **Check Actions Tab**: View deployment logs in GitHub Actions
2. **Verify Permissions**: Ensure GitHub Pages has write permissions
3. **Check Base Path**: Confirm `base` in `vite.config.js` matches repo name

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)

## 🤝 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review closed issues in the GitHub repository
3. Open a new issue with detailed information

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

*Last updated: January 2026*
