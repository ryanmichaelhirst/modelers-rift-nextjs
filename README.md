# League of Legends Champion Builder

Web app to explore champion stats, item builds, and lane match-ups.

### How to generate assets

If you would like to use `npm run bin -- -c={some-command}` you will need to create an /input and /output folder.

You will need to extract all champion wad files using LeagueBulkConvert for 3D models (gltf / glb files).
You will need to extract all champion wad files using Obsidian for voice lines and sound effects (ogg / wav files).

### Extracting Champion Models

1. Download League Bulk Converter
   https://github.com/Jochem-W/LeagueBulkConvert

## Setting up the /input directory (.gltf files)

2. Install and run the converter
3. Move the extracted files to /input

## Generating the /output directory (.glb files)

4. Run `npm run bin -- -c=generate-glb`
5. Verify that the glb files have been uploaded to your S3 bucket

### Bulk Generate BNK files

https://github.com/rmbh4211995/Obsidian

### Convert BNK -> OGG / WAV

https://www.youtube.com/watch?v=cMXan62JCuk

https://github.com/Morilli/bnk-extract/releases/tag/v1.6

`./bnk-extract.exe --audio path/to/audio.[bnk|wpk] [--bin path/to/skinX.bin --events path/to/events.bnk] [-o path/to/output] [--wems-only] [--oggs-only]`

### Prisma

To make changes to the database, create a draft migration

`npx prisma migrate dev --name ${migration-name} --create-only`

Modify the generated SQL file, then apply the migration

`npx prisma migrate dev`

Generate the client

`npx prisma generate`

View your database

`npx prisma studio`

### Graphql

Install rover cli

`curl -sSL https://rover.apollo.dev/nix/latest | sh`

Configure rover with apollo studio

`rover config auth`

Generate schema.graphql (introspection)

`rover graph introspect http://localhost:4000/graphql > graphql/generated/schema.graphql`

Generate schema.graphql (schema definition language)

`rover graph fetch My-Graph-yoeh8f > graphql/generated/schema.graphql`

Generate schema.json

`npx apollo schema:download --endpoint=http://localhost:4000/graphql schema.json`
