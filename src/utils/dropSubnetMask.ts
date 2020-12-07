const dropIPv6SubnetMask = (ip: string) => {
  return ip.replace('::ffff:', '');
};

export default dropIPv6SubnetMask;
