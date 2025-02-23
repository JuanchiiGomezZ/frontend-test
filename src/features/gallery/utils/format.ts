export const formatPrice = (
  price: number | string,
  currency: string = 'EUR'
): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(Number(price));
};
