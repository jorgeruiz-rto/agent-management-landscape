# Agent Management Competitive Landscape

This repository contains the interactive visualizer for the Agent Management Competitive Landscape.

## Local View

To view the landscape locally:
1. Open [index.html](index.html) in any modern web browser.
2. Drag to pan the landscape map.
3. Scroll or use the `+` / `-` buttons to zoom in and out.
4. Click on any vendor to see their detailed profile and competitive analysis.
5. Use the "Compare vendors" tab to select multiple vendors and see a side-by-side comparison.

## Deployment to GitHub Pages

This repository is configured with a GitHub Actions workflow that automatically deploys the code to GitHub Pages on every push to the `main` branch.

To set up and publish:
1. Create a new repository on GitHub (e.g. named `agent-management-landscape`).
2. Add the remote to your local repository:
   ```bash
   git remote add origin https://github.com/<your-username-or-org>/agent-management-landscape.git
   ```
3. Push to GitHub:
   ```bash
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages**.
5. Under **Build and deployment**, ensure the **Source** is set to **GitHub Actions**.
6. The action will run and publish the site automatically.
