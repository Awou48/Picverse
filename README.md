# Picverse

Picverse is a static website for a digital art community. Visitors can browse artwork by category, read about the project, see community activity, and submit their own art.

The site uses plain HTML, CSS, and JavaScript. It has no build step, framework, or backend.

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Hero section with a rotating background (Animals, Nature, Anime, Game, Fantasy) and a slider of featured artwork |
| Gallery | `gallery.html` | Artwork grid filtered by tag. Clicking an image opens a modal with title, artist, tags, and description |
| Community | `community.html` | Users list, open forum, and recent activity |
| Submission | `submission.html` | Form to submit artwork, with file preview and validation |
| About Us | `about-us.html` | Vision, mission, and key features of Picverse |

## Project structure

```
Picverse/
├── index.html
├── gallery.html
├── community.html
├── submission.html
├── about-us.html
└── assets/
    ├── css/
    │   ├── main.css         # Shared base styles
    │   ├── navbar.css       # Navigation bar and hamburger menu
    │   ├── footer.css
    │   ├── hero.css         # Home page hero
    │   ├── slider.css       # Home page artwork slider
    │   ├── gallery.css
    │   ├── community.css
    │   ├── submission.css
    │   ├── about.css
    │   └── responsive.css   # Breakpoint overrides
    ├── js/
    │   ├── navbar.js        # Mobile menu toggle
    │   ├── background.js    # Home hero background slideshow
    │   ├── slider.js        # Featured artwork slider
    │   ├── gallery.js       # Gallery data, tag filter, and image modal
    │   └── submission.js    # Form validation, file preview, success message
    └── images/              # Artwork grouped by category
```

## Running locally

Open `index.html` in a browser.

A local server avoids browser restrictions on `file://` URLs. For example:

```bash
# Python 3
python -m http.server 8000
```

Then go to http://localhost:8000.

## Submission form

The form asks for email, title, description, tags, whether the work is original, and an image file.

- Only image files are accepted.
- Files must be smaller than 5 MB.

The form has no backend. After validation, it waits about 2 seconds, shows a success message, and resets. No data is sent or stored.

## Editing content

Artwork lists live in JavaScript arrays, not in a database:

- Gallery items: `galleryData` in `assets/js/gallery.js`. Each item has `src`, `title`, `artist`, `tags`, and an optional `description`.
- Home slider: `sliderData` in `assets/js/slider.js`.
- Hero backgrounds: `backgroundData` in `assets/js/background.js`.

To add artwork, put the image in the matching folder under `assets/images/` and add an entry to the array.

## Dependencies

- [Font Awesome 6.0.0-beta3](https://fontawesome.com/), loaded from cdnjs, for icons.

## Credits

The artwork belongs to the artists named in the site, such as Freepik, @Steviefeesh, and @ImagiGraphStudio.
