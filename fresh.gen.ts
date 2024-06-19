// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_password from "./routes/api/password.ts";
import * as $index from "./routes/index.tsx";
import * as $reauth from "./routes/reauth.tsx";
import * as $passwordForm from "./islands/passwordForm.tsx";
import * as $reauthForm from "./islands/reauthForm.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/password.ts": $api_password,
    "./routes/index.tsx": $index,
    "./routes/reauth.tsx": $reauth,
  },
  islands: {
    "./islands/passwordForm.tsx": $passwordForm,
    "./islands/reauthForm.tsx": $reauthForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
