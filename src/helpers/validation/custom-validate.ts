export const customMonthValidate = (val: string) => val.length == 2 && +val <= 12 && +val > 0;
