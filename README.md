
# Abhijeet Thakur - Portfolio Website

A modern, responsive portfolio website showcasing Abhijeet Thakur's skills, projects, and contact information.

![Portfolio Preview](images/portfolio-preview.jpg)

## Features

- **Responsive Design**: Fully optimized for all devices (mobile, tablet, desktop)
- **Interactive UI**: Smooth animations and transitions enhance user experience
- **Dark/Light Mode**: Toggle between dark and light themes
- **Particle System**: Interactive particle animation in the hero section
- **Lazy Loading**: Images load only when they come into view for better performance
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Mobile-First Approach**: Designed with mobile users as a priority
- **Custom Cursor**: Enhanced cursor experience on desktop devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Interactive form with validation and submission feedback

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts
- Devicon for tech stack icons

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # JavaScript functionality
├── images/             # Image assets
│   ├── profile.jpg     # Profile picture
│   └── ...             # Other images
└── README.md           # Project documentation
```

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thakur-abhijeet/portfolio.git
   cd portfolio
   ```

2. **Open the project**
   - Open `index.html` in your browser to view the website locally
   - Alternatively, use a local development server:
     ```bash
     # Using Python
     python -m http.server
     
     # Using Node.js (with http-server package)
     npx http-server
     ```

3. **Deployment**
   - The website can be deployed to any static hosting service like GitHub Pages, Netlify, or Vercel
   - Simply upload all files to your hosting provider

## Customization

### Changing Content

1. **Personal Information**: Edit the text in `index.html` to update your personal details, bio, and contact information
2. **Projects**: Modify the project cards in the "Featured Projects" section
3. **Skills**: Update the skills grid to reflect your technical expertise
4. **Gallery**: Replace images in the gallery section with your own work

### Styling

1. **Colors**: Modify the CSS variables in the `:root` selector in `style.css`:
   ```css
   :root {
     --primary: #e63946;        /* Main accent color */
     --secondary: #1a1a1a;      /* Background color */
     /* Other color variables */
   }
   ```

2. **Fonts**: Change the Google Fonts import in the `<head>` of `index.html` and update the font variables in `style.css`

3. **Layout**: Adjust grid and flexbox properties in `style.css` to modify the layout

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Accessibility Features

- Semantic HTML structure
- ARIA attributes where necessary
- Keyboard navigation support
- Skip to content link
- Sufficient color contrast
- Focus indicators for keyboard users
- Alt text for all images

## Performance Optimizations

- Lazy loading for images
- Minified CSS and JavaScript (in production)
- Optimized image assets
- Efficient animations using CSS transitions and requestAnimationFrame

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Font Awesome](https://fontawesome.com/) and [Devicon](https://devicon.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspiration from modern portfolio design trends

---

© 2024 Abhijeet Thakur. All rights reserved.
