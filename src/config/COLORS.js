
export const COLORS = {
    primary: null,
    secondary: null,
    logo: null
}

export const setColors = (data) => { 

    COLORS.primary = data?.primary_color
    COLORS.secondary = data?.secondary_color
    COLORS.logo = data?.image
}