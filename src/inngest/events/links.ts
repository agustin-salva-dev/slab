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
      rawUserAgent?: string;
    };
  };
  "link/expiration.scheduled": {
    data: {
      linkId: string;
      expiresAt: string;
    };
  };
  "link/expiration.cancelled": {
    data: {
      linkId: string;
    };
  };
};
