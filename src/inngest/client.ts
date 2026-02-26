import { Inngest, EventSchemas } from "inngest";

import { SlabEvents } from "./events";

export const inngest = new Inngest({
  id: "slab-app",
  schemas: new EventSchemas().fromRecord<SlabEvents>(),
});
