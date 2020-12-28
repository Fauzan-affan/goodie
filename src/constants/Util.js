export function currency(Amount, currency) {
  var defaultCurrency =
    currency.lookupValue === null || currency.lookupValue === ""
      ? "Rp. "
      : currency.lookupValue;
  var amountWithCurrency = "Rp 0";

  if (Amount !== undefined && Amount !== "" && Amount !== null) {
    amountWithCurrency = defaultCurrency + " " + Amount.toLocaleString("id-ID");
  }

  return amountWithCurrency;
}

export function random(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
