export type LinkEvents = {
  "link/verify.requested": {
    data: {
      linkId: string;
      originalUrl: string;
    };
  };
  "link/click.recorded": {
    data: {
      linkId: string;
      country?: string;
      device?: string;
      source?: string;
    };
  };
};
