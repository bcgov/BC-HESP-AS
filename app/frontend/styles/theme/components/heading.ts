export const Heading = {
  baseStyle: {
    lineHeight: "150%",
    marginBottom: "0.5em",
  },

  variants: {
    yellowline: {
      // puts a decorative yellow bar above the header text
      marginTop: "1em",
      lineHeight: "150%",
      _before: {
        display: "block",
        width: "36px",
        height: "8px",
        borderTop: "4px solid",
        borderColor: "theme.yellow",
      },
      ["&:first-child"]: {
        marginTop: "0",
      },
    },
  },
}
