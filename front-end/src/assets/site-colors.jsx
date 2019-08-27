const palette = {
    main: {
        background: '#5D1F62', // DOLABY
        title: '#FFB3E0',
        text: '#FFF',
        link: '#FFF',
        linkHover: '#FFD9F9',
        button: '#FFB3E0',
        buttonText: '#5D1F62',
        buttonHover: '#F2D7EE',
        icon: '#69306D',
        iconBackground: '#F2D7EE',
    },
    support: {
        background: '#7c6e9d',
        backgroundGradient: '#594589',
        title: '#FFF',
        text: '#FFF',
        link: '#FFF',
        linkHover: '#ff96f6',
        button: '#FFF',
        buttonText: '#8e7ac0',
        buttonHover: '#8e7ac0',
        icon: '#594589',
        iconBackground: '#FFF',
    },
    dark: {
        background: '#0E103D', 
        title: '#ff73f6',
        text: '#FEF5FF',
        link: '#FFF1FD',
        linkHover: '#FFBAED',
        button: '#ffc0fa',
        buttonText: '#61175c',
        buttonHover: '#ff73f6',
        icon: '#ff90d1',
        iconBackground: '#4c246a',
    },
    light: {
        background: '#EFE6DD',
        title: '#69306D',
        text: '#000',
        link: '#A5668B',
        linkHover: '#B581A0',
        button: '#845587',
        buttonText: '#FFF',
        buttonHover: '#B581A0',
        icon: '#393B60',
        iconBackground: '#F4DEF1',
    },
    white: {
        background: '#FFF',
        title: '#69306D',
        text: '#000',
        link: '#A5668B',
        linkHover: '#B581A0',
        button: '#845587',
        buttonText: '#FFF',
        buttonHover: '#B581A0',
        icon: '#393B60',
        iconBackground: '#F4DEF1',
    },
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
                primary: palette.dark.background,
            },
            Links: {
                primary: palette.dark.link,
                hover: palette.dark.linkHover,
            },
            Icons: {
                primary: palette.dark.link,
                hover: palette.dark.linkHover,
            },
        },

        CategoriesBar: {
            Background: {
                primary: palette.main.background,
            },
            Links: {
                primary: palette.main.link,
                hover: palette.main.linkHover,
            },
        },

        BrandsSection: {
            Background: {
                primary: palette.main.background,
            },
            Icons: {
                primary: palette.main.icon,
                secondary: palette.main.iconBackground,
            },
        },

        ProductsSection: {
            Background: {
                primary: palette.white.background,
            },
            Links: {
                primary: palette.white.link,
                hover: palette.white.linkHover,
            },
            Icons: {
                primary: palette.white.icon,
                secondary: palette.white.iconBackground,
            },
        },

        InfoSection: {
            Background: {
                primary: palette.main.background,
            },
            Icons: {
                primary: palette.main.icon,
                secondary: palette.main.iconBackground,
            },
            Text: {
                primary: palette.main.title,
                secondary: palette.main.text,
            }
        },

        AboveFooter: {
            Background: {
                primary: palette.white.background,
            },
            Icons: {
                primary: palette.white.icon,
                secondary: palette.white.iconBackground,
            },
            Text: {
                primary: palette.white.title,
                secondary: palette.white.text,
            }
        },

        Footer: {
            Background: {
                primary: palette.dark.background,
            },
            Links: {
                primary: palette.dark.link,
                hover: palette.dark.linkHover,
            },
            Text: {
                primary: palette.dark.title,
                secondary: palette.dark.text,
            },
            Icons: {
                primary: palette.dark.icon,
                secondary: palette.dark.iconBackground,
            },
        },
    },

    SHOP: {
        TextBanner: {
            Background: {
                primary: palette.support.background,
                secondary: palette.support.backgroundGradient,
            },
            Text: {
                primary: palette.support.title,
            }
        },
        ProductsListWrapper: {
            Background: {
                primary: palette.white.background,
            },
            Title: {
                primary: palette.white.title,
            },
            Text: {
                primary: palette.white.text,
            },
        },
        FiltersPanel: {
            Background: {
                primary: palette.light.background,
            },
            Title: {
                primary: palette.light.title,
            },
            Text: {
                primary: palette.light.text,
            },
            Button: {
                primary: palette.light.button,
                hover: palette.light.buttonHover,
                text: palette.light.buttonText,
            },
            Icon: {
                primary: palette.light.icon,
            },
            Link: {
                primary: palette.light.link,
                hover: palette.light.linkHover,
            }
        },
        ProductCard: {
            Background: {
                primary: palette.white.background,
            },
            Title: {
                primary: palette.white.title,
            },
            Text: {
                primary: palette.white.text,
            },
            Icon: {
                primary: palette.white.icon
            }
        }
    }
}

export default COLORS;