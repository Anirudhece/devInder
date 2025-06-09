const HEADERS = {
  "Content-Type": "application/json",
  ...(process.env.NEXT_PUBLIC_BEARED_TOKEN
    ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARED_TOKEN}` }
    : {}),
};

export {HEADERS}
