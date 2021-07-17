import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1)
    textAlign: "left",
    minWidth: 120,
    maxWidth: 220,
  },

  homeTile: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: "bold",
  },

  // @media screen and (max-width: 768px) {
  //   font-size: 28px;
  //   font-weight: 600;
  // }

  btn: {
    textTransform: "none",
    minWidth: "300px",
    padding: 0,

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  cardResult: {
    margin: "6px",
    minWidth: "300px",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  cardContent: {
    minWidth: "300px",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },

    "&:last-child": {
      paddingBottom: "12px",
    },
    padding: "12px",
  },

  inline: {
    display: "inline",
  },

  root: {
    // width: "100%",

    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "12px",
    // paddingBottom: "100px",
  },

  boxResult: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    // minHeight: "100vh",
    paddingTop: "10px",
  },

  title: {
    fontWeight: "bold",
    fontSize: "18px",
  },

  subTitle: {
    fontSize: "16px",
    color: theme.palette.grey[800],
  },

  table: {
    padding: "12px",
  },

  tableCont: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 500,
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    // padding: "12px",
  },

  cardTitle: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: theme.typography.body1.fontSize,
  },
  cardSubtitle: {
    fontWeight: "bold",
    color: theme.palette.grey[800],
    fontSize: theme.typography.body2.fontSize,
  },
  cardOtherText: {
    color: theme.palette.grey[800],
    fontSize: theme.typography.subtitle2.fontSize,
  },

  image: {
    height: "150px",
    padding: "12px",
  },

  noResultTitle: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: theme.typography.h6.fontSize,
  },

  divider: {
    marginTop: "4px",
    marginBottom: "4px",
  },

  tableHead: {
    backgroundColor: theme.palette.primary.light,
    border: "1px solid #7986CB",
  },
}));
