# Modeler's Rift

Web app for viewing all champion assets from League of Legends

Assets include:

1. Models
2. Voice lines
3. Sound effects
4. Champion Interactions

### How to generate assets

If you would like to use `yarn run bin -c={some-command}` you will need to create an /input and /output folder.

You will need to extract all champion wad files using LeagueBulkConvert for 3D models (gltf / glb files).
You will need to extract all champion wad files using Obsidian for voice lines and sound effects (ogg / wav files).

### Generating models (.glb files)

Please follow the [generating-models-guide](/docs/generating-models-guide.md) to generate 3D models for all champions!

### Generating audios (.bnk and .wpk files)

Please follow the [generating-audios-guide](/docs/generating-audios-guide.md) to generate audio files for all champions!

### Prisma

To make changes to the database update the `prisma/schema.prisma` file

Next generate and apply the sql migration

`npx prisma migrate dev`

Apply migrations to production

`npx prisma migrate deploy`

Generate the client

`npx prisma generate`

### tRPC

The previous api was implemented with graphql but was extremely heavy client-side.

The API layer now uses a series of tRPC packages that are extremly light weight

https://bundlephobia.com/package/@trpc/next@9.27.2

Queries and mutations can be created under `/server/routers` and then added to `/server/trpc.ts`

### Development

First run the dev server

`yarn run dev`

This will launch nextjs in development mode, and start a local postgres db with `docker`

Next populate the db

`yarn run bin -c=seed-db`

Finally view your db to make sure everything is setup properly

`npx prisma studio`

### Cloudflare Tunnels

You can expose your localhost server (`yarn dev`) as a publicaly routable IP address with ssh tunneling

Full instructions [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/#set-up-a-tunnel-locally-cli-setup)

Install with homebrew

`brew install cloudflare/cloudflare/cloudflared`

Login using cli

`cloudflared tunnel login`

Create a tunnel

`cloudflared tunnel create <NAME>`

Update config file with your creds

`cp cloudflare.yaml.sample cloudflare.yaml`

Route traffic to tunnel

`cloudflared tunnel route dns <UUID or NAME> <hostname>`

Run the tunnel

`cloudflared tunnel run <UUID or NAME>` or `yarn tunnel`

Get the name record mappings on vercel

`https://dash.cloudflare.com/${account_id}/${website}.com/dns`

Add name records to cloudflare

`https://vercel.com/${user}/${repo}/settings/domains`

### Patreon Pledges

Each patreon pledge will dispatch an event to the patreon webhook located at `/pages/api/patreon/index.ts`

View and edit webhook events

`https://www.patreon.com/portal/registration/register-webhooks`

Patreon webhook docs

`https://docs.patreon.com/#webhooks`

### Donations with Stripe

Donations are powered through Stripe and recorded through a webhook at `/api/stripe/event.ts`

To test and development your webhook you will need to install the stripe cli

`https://stripe.com/docs/stripe-cli#install`

Login to the cli

`stripe login`

Forward events to your webhook

`stripe listen --forward-to localhost:3000/api/stripe/event`

Trigger a webhook event

`stripe trigger checkout.session.completed`

For a full list of supported events

`stripe trigger --help`

Simulate a payment with stripe test cards

`https://stripe.com/docs/testing`

Use card details `4242 4242 4242 4242`, `12/34` and `123`

### Performance Testing

Test cdn content such as images, 3d models, and video with `https://tools.keycdn.com/performance`

Test web page performance with [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) and `https://pagespeed.web.dev`
