function FormatCurrency({money}) {
  return (
    money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
  );
}

export default FormatCurrency;