# Esmusum - Our Anniversary Website

A beautiful anniversary website celebrating our love with:
- Starry night background with constellations
- Countdown timer
- Love reasons that automatically cycle
- Random memories gallery
- Background music
- Interactive animations

Visit the website at: https://peppersugar.github.io/Esmusum/

## Features

- ✨ Magical starry night background with twinkling stars
- ⏰ Real-time countdown timer showing days, hours, and minutes since March 31, 2019
- 📸 Responsive photo gallery
- 📱 Mobile-friendly design
- 🎨 Clean, modern, and elegant UI

## Customization

### Adding Your Photos
1. Create an `images` folder in the root directory
2. Add your photos to the `images` folder
3. Update the image sources in `index.html`:
   ```html
   <div class="gallery-item">
       <img src="images/your-photo.jpg" alt="Your memory description">
   </div>
   ```

### Changing the Anniversary Date
To change the anniversary date, edit the `anniversaryDate` variable in `script.js`:
```javascript
const anniversaryDate = new Date('YYYY-MM-DD');
```

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```
3. Go to your repository's Settings
4. Scroll down to the "GitHub Pages" section
5. Select the `main` branch as the source
6. Click "Save"

Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

## Local Development

To run the website locally:
1. Clone the repository
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Technologies Used

- HTML5
- CSS3 (with animations and responsive design)
- JavaScript (for timer functionality)
- Font Awesome (for icons) 