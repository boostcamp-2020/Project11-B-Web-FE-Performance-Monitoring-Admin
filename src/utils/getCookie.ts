const getCookieByKey = (key: string): string | undefined => {
  const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return value ? value[2] : undefined;
};

export default getCookieByKey;
