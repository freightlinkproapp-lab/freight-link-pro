# Stripe Key Update Guide

## iOS publishable key
File: `ios_app/FreightLinkPro/FreightLinkProApp.swift`

Replace:
`pk_live_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY`

## Android publishable key
File: `android_app/app/src/main/java/com/freightlinkpro/app/MainActivity.kt`

Replace:
`pk_live_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY`

## Backend secret key
File: `backend/.env.example`

Copy `.env.example` to `.env` and replace:
- `sk_live_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY`
- `whsec_REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET`
