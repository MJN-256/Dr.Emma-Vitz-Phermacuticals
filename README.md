# VITZ Pharmaceuticals

A responsive, single-page website for VITZ Pharmaceuticals, a healthcare supply partner based in Kampala, Uganda. The site introduces the company, describes its services and approach, and gives healthcare providers a direct way to make enquiries on WhatsApp.

> The project folder is named `Dr.Viola phermacutical`, while the website itself is branded **VITZ Pharmaceuticals**.

## Features

- Company introduction, services, and partnership information
- Direct WhatsApp enquiry links for both listed contact numbers
- Responsive navigation for desktop and mobile
- Animated 3D pharmaceutical-themed background
- Reduced-motion support and keyboard-visible focus styles
- No build step, framework, or package installation required

## Run locally

Open `index.html` in a browser. For a local web server, run this command from the project directory:

```powershell
py -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page content, metadata, navigation, and contact links |
| `styles.css` | Layout, responsive styling, and reduced-motion behavior |
| `script.js` | Mobile navigation and Three.js background animation |

## External resources

The page loads Three.js and the Cormorant Garamond and Manrope fonts from external CDNs. An internet connection is needed for these resources; the rest of the site is served from the local project files.

## Contact details

The contact section links to WhatsApp using the numbers configured in `index.html`:

- +256 704 864 947
- +256 776 258 855

Update the links in `index.html` if these contact details change.
