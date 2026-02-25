import { Inngest, EventSchemas } from "inngest";

type SlabEvents = {
  "link/click.recorded": {
    data: {
      linkId: string;
      country?: string;
      device?: string;
    };
  };
};

export const inngest = new Inngest({
  id: "slab-app",
  schemas: new EventSchemas().fromRecord<SlabEvents>(),
});
