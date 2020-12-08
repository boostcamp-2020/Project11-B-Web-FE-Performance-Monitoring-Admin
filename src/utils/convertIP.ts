export const dropIPv6SubnetMask = (ip: string): string => {
  return ip.replace('::ffff:', '');
};

export const convertLocalHost = (ip: string): string => {
  if (ip === '::1') return '127.0.0.1';
  return ip;
};

export const convertIP = (ip: string): string => {
  return convertLocalHost(dropIPv6SubnetMask(ip));
};
