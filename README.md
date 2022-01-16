# League of Legends Champion Builder

Web app to explore champion stats, item builds, and lane match-ups.

### How to generate assets

If you would like to use `npm run bin -- -c={some-command}` you will need to create an /input and /output folder.

You will need to extract all champion wad files using LeagueBulkConvert for 3D models (gltf / glb files).
You will need to extract all champion wad files using Obsidian for voice lines and sound effects (ogg / wav files).

### Bulk Generate GLTF Models

https://github.com/Jochem-W/LeagueBulkConvert

### Convert GLTF -> GLB

`npm run bin -c='generate-glb'`

### Convert GLB -> React Fiber JSX

https://gltf.pmnd.rs/

https://stackoverflow.com/questions/58960077/how-to-check-if-a-strongly-typed-object-contains-a-given-key-in-typescript-witho

`npm run bin -c='generate-glb'`

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
