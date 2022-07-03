export const getDomainInfo = (host?: string) => {
  const protocol = host?.includes("localhost:") ? "http" : "https";
  return [host, protocol];
};

export const getDisplayDatetime = (datetimeString: string) => {
  const dt = new Date(datetimeString);

  const date = `${dt.getDate()} ${dt.toLocaleString([], {
    month: "short",
  })} ${dt.getFullYear()}`;

  const time = `${dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return `${date}, ${time}`;
};
