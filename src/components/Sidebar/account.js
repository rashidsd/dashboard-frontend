import { AccountTree, Alarm } from "@mui/icons-material";
const accounts = [
  {
  icon: <AccountTree />,
  title: "Account",
  items: [
    {
      icon: '',
      title: "Vouchers",
      items: [
        {
          title:'Cash payment',
          to:'#'
        },
        {
          title:'Bank payment',
          to:'#'
        }
      ],
    },
    {
          title:'Bank Reconsiliation',
          to:'#'
    },
    {
      title:'Balance Sheet',
      to:'#'
}
  ]
}
]

export default accounts;
