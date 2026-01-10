# Dyslexia-Friendly Notes App

A note-taking application specifically designed for people with dyslexia, featuring customizable fonts, spacing, and color overlays to improve readability.


[Link to deployed app](https://clearnotes.onrender.com/)

## Features

### Accessibility Features
- **OpenDyslexic Font**: Default dyslexia-friendly font with alternatives
- **Adjustable Font Size**: 14px to 28px range
- **Line Spacing Control**: 1.5x to 3x spacing
- **Letter Spacing**: Customizable character spacing
- **Color Overlays**: Yellow, blue, green, and pink tinted backgrounds
- **Custom Text Colors**: Full color picker for text
- **Clean, Distraction-Free Interface**

### Core Functionality
- Create, edit, and delete notes
- Auto-save timestamps
- Organized note list with previews
- Responsive design for mobile and desktop
- **SQLite database** - No external database server required!

## Running the app
Ue the command `docker build -t app . && docker run -p 8000:8000 -e API_PORT=8000 app` to run and test locally


## Accessibility Design Principles

This app follows WCAG 2.1 guidelines and incorporates specific features for dyslexic users:

1. **Font Choice**: OpenDyslexic as default, with sans-serif alternatives
2. **Spacing**: Increased line and letter spacing options
3. **Color**: High contrast ratios and customizable overlays
4. **Simplicity**: Clean interface without visual clutter
5. **Consistency**: Predictable layout and navigation


## License

MIT License

## Support

For issues or questions, please open an issue on the repository.

---

Built with ❤️ for improved accessibility