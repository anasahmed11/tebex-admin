const palette = {
    first: {
        background: '#247BA0', // GREENBLUE
        support: '#FF6B6B',
        title: '#FFE66D',
        text: '#F7FFF7',
        link: '#68E0FF',
        linkHover: '#6FD8F2',
        button: '#FF1654',
        buttonText: '#F3FFBD',
        buttonHover: '#FF4073',
    },
    second: {
        background: '#FF1654',  // PINK
        support: '#FFA730',
        title: '#FDFFFC',
        text: '#F3FFBD',
        link: '#F9A5FF',
        linkHover: '#FFBAED',
        button: '#70C1B3',
        buttonText: '#1A535C',
        buttonHover: '#B2DBBF',
    },
    third: {
        background: '#EFE6DD',
        support: '#FF1654',
        title: '#247BA0',
        text: '#011627',
        link: '#231942',
        linkHover: '#5E548E',
        button: '#70C1B3',
        buttonText: '#011627',
        buttonHover: '#B2DBBF',
    },
    light: {
        background: '#FDFFFC',
        support: '#231942',
        title: '#231942',
        text: '#5E548E',
        link: '#69306D',
        linkHover: '#A5668B',
        button: '#0E103D',
        buttonText: '#F2D7EE',
        buttonHover: '#23254E',
    },
    dark: {
        background: '#011627',
        support: '#FF9F1C',
        title: '#2EC4B6',
        text: '#F3FFBD',
        link: '#E0B1CB',
        linkHover: '#F2D7EE',
        button: '#4ECDC4',
        buttonText: '#1A535C',
        buttonHover: '#6ED6CE',
    }
}

const COLORS = {
    
    HOME: {

        LinksBar: {
            background: {
                primary: palette.dark.background,
            },
            links: {
                primary: palette.dark.link,
                hover: palette.dark.linkHover,
            },
        },

        Appbar: {
            Background: {
                primary: palette.first.background,
            },
            Links: {
                primary: palette.first.link,
                hover: palette.first.linkHover,
            },
            Icons: {
                primary: palette.first.link,
                hover: palette.first.linkHover,
            },
        },

        CategoriesBar: {
            Background: {
                primary: palette.first.support,
            },
            Links: {
                primary: palette.first.text,
                hover: palette.first.title,
            },
        },

        BrandsSection: {
            Background: {
                primary: palette.first.background,
            },
            Icons: {
                primary: palette.light.background,
                secondary: palette.light.support,
            },
        },

        ProductsSection: {
            Background: {
                primary: palette.third.background,
            },
        },

        InfoSection: {
            Background: {
                primary: palette.first.background,
            },
            Icons: {
                primary: palette.second.support,
                secondary: palette.second.title,
            },
            Text: {
                primary: palette.second.title,
                secondary: palette.second.text,
            }
        },

        AboveFooter: {
            Background: {
                primary: palette.light.background,
            },
            Icons: {
                primary: palette.light.support,
                secondary: palette.dark.background,
            },
            Text: {
                primary: palette.light.title,
                secondary: palette.light.text,
            }
        },

        Footer: {
            Background: {
                primary: palette.light.background,
            },
            Links: {
                primary: palette.light.link,
                hover: palette.light.linkHover,
            },
            Text: {
                primary: palette.light.text,
            }
        },
    }    
}

export default COLORS;