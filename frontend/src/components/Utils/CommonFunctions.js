const numberFormatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
});

export const formatNumberCustom = (value, option, statistic) => {
    value = Math.floor(value);
    return numberFormatter.format(value) + (option === '%' ? '%' : '');
};

export const capitalizeCustom = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
