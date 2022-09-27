# Modeler's Rift

Web app for viewing all champion assets from League of Legends

Assets include:

1. Models
2. Voice lines
3. Sound effects
4. Champion Interactions

### How to generate assets

If you would like to use `npm run bin -- -c={some-command}` you will need to create an /input and /output folder.

You will need to extract all champion wad files using LeagueBulkConvert for 3D models (gltf / glb files).
You will need to extract all champion wad files using Obsidian for voice lines and sound effects (ogg / wav files).

### Extracting Champion Models

1. Download League Bulk Converter
   https://github.com/Jochem-W/LeagueConvert/releases

## Setting up the /input directory (.gltf files)

2. Install and run the converter
3. Install Directoy should be C:\Riot Games\League of Legends
4. Move the extracted files to /input

## Generating the /output directory (.glb files)

4. Run `npm run bin -- -c=generate-glb`
5. Assets will be extracted to /output/glb_models

### Extracting Champion Audios

1. Download Obsidian
   https://github.com/Crauzer/Obsidian

## Setting up the /input directory (.bnk and .wpk files)

2. Install and run Obsidian
3. Select Riot Games -> League of Legends -> Game -> DATA -> Final -> Champions at the source directory
4. Extract all to /input directory

## Generating the /output directory (.ogg files)

5. Run `npm run bin -- -c=job -f=extract-sounds`
6. Run `npm run bin -- -c=job -f=transform-sounds`
7. Raw assets will be extracted to /output/extracted
8. Human readable assets will be extracted to /output/transformed

### Convert BNK -> OGG / WAV

https://www.youtube.com/watch?v=cMXan62JCuk

https://github.com/Morilli/bnk-extract/releases/tag/v1.6

`./bnk-extract.exe --audio path/to/audio.[bnk|wpk] [--bin path/to/skinX.bin --events path/to/events.bnk] [-o path/to/output] [--wems-only] [--oggs-only]`

### Prisma

To make changes to the database, create a draft migration

`npx prisma migrate dev --name ${migration-name} --create-only`

Modify the generated SQL file, then apply the migration

`npx prisma migrate dev`

Apply migrations to production

`npx prisma migrate deploy`

Generate the client

`npx prisma generate`

### tRPC

The previous api was implemented with graphql but was extremely heavy client-side.

The API layer now uses a series of tRPC packages that are extremly light weight

https://bundlephobia.com/package/@trpc/next@9.27.2

Queries and mutations can be created under `/routers` and then added to `/pages/api/trpc/[trpc].ts`

### Development

First run the dev server

`yarn run dev`

This will launch nextjs in development mode, and start a local postgres db with `docker`

Next populate the db

`yarn run bin -c=seed-db`

Finally view your db to make sure everything is setup properly

`npx prisma studio`
