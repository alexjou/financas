export function maskMoney(item) {
  return 'R$ ' + item.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
};