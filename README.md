# JobPortal — Shopify Theme

A Shopify Online Store 2.0 theme that repurposes Shopify's commerce engine to run a job board / job portal. Built with standard Liquid sections, JSON templates, and theme settings — no external backend.

## How job data maps onto Shopify

Shopify themes have no custom database, so every "job portal" concept is mapped onto a native Shopify object:

| Job portal concept   | Shopify object                          |
|-----------------------|------------------------------------------|
| Job listing            | Product                                   |
| Company name           | Product vendor                            |
| Job type (Full-time…) | Product type                              |
| Salary                 | Product price                             |
| Location               | Product metafield `job.location` (custom) |
| Category / skills      | Product tags                              |
| Job category page      | Collection                                |
| "Apply Now"             | Add-to-cart form with applicant fields    |
| Submitted applications  | Cart → Checkout (relabeled "Applications") |
| Candidate account       | Customer account                          |
| Past applications       | Customer order history                    |
| Company news/announcements | Blog + Articles                       |

### Important limitation
Because there's no custom backend, "applying" technically goes through Shopify's cart/checkout flow. The applicant's name, email, resume link, and cover note are captured as line item properties on checkout. You will see real applications as **orders** in your Shopify admin — that's the mechanism, just relabeled in the UI. There is no separate database of "applicants" outside of that.

If you need real applicant tracking (resume parsing, employer dashboards, status workflows), that needs a custom app or external ATS — a theme alone can't do that.

## Setting up a job listing
1. Go to **Products** in your Shopify admin → Add product.
2. Title = job title. Description = job description.
3. Vendor field = company name.
4. Type field = job type (e.g. "Full-time", "Remote").
5. Price = salary (or leave at $0 and turn off `show_price_as_salary` in theme settings if you don't want a price shown).
6. Tags = skills/category (e.g. `engineering`, `remote`, `senior`).
7. Add the product to a Collection to make it appear in category pages and the homepage grid.
8. (Optional) Add a `job.location` metafield (Settings → Custom data → Products) to show a location pill.

## File structure
```
layout/        theme.liquid, password.liquid
templates/     index, product, collection, search, cart, blog, article, 404, page, customers/*
sections/      header, footer, hero-search, job-listings-grid, main-job-detail, main-collection-jobs, etc.
snippets/      job-card.liquid (reusable job card)
assets/        base.css, theme.js
config/        settings_schema.json, settings_data.json
locales/       en.default.json
```

## Deploying via GitHub to Shopify

1. Push this folder's contents to a GitHub repository (root of the repo = theme root, i.e. `layout/`, `templates/`, etc. should be at the top level).
2. In Shopify admin: **Online Store → Themes → Add theme → Connect from GitHub**.
3. Authorize the Shopify GitHub app and select your repository + branch.
4. Shopify pulls the theme in as an unpublished theme you can preview.
5. Customize via **Theme Editor** (colors, fonts, menus, sections are all editable there).
6. Click **Publish** when ready to go live.

Alternatively, using Shopify CLI:
```bash
npm install -g @shopify/cli
shopify theme dev    # local preview, connects to a dev store
shopify theme push   # push to your store as a new theme
```

## Customizing labels
Theme settings (Theme Editor → Theme settings → Job listings) let you rename "Apply Now", "Salary", "Job Type", "Location", and "Company" labels without touching code.
