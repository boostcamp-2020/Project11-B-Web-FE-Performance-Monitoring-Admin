export default (rows: any[][] | undefined): void => {
  if (!rows) {
    return;
  }
  const csvContent = `data:text/csv;charset=utf-8,${rows.map((e) => e.join(',')).join('\n')}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'my_data.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};
