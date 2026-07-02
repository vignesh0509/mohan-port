<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/221a6203-73e8-4e11-b78f-00c674b6275c

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, enable Pages and select the "GitHub Actions" source.
3. The included workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build and publish the site automatically on every push to the `main` branch.
