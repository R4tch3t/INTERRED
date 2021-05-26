import Dashboard from "views/Dashboard.js";
import listaClientes from "views/clientes/listaClientes.js";
import addClientes from "views/clientes/addClientes.js";
import editCliente from "views/clientes/editClientes.js";

var routes = [
  /*{
    path: "/dashboard",
    name: "Estadisticas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },*/
  {
    path: "/listaClientes",
    name: "Lista de clientes",
    icon: "tim-icons icon-notes",
    component: listaClientes,
    layout: "/admin"
  },
  {
    path: "/agregarCliente",
    name: "Registrar cliente",
    icon: "tim-icons icon-simple-add",
    component: addClientes,
    layout: "/admin"
  },
  {
    path: "/editarCliente",
    name: "Editar cliente",
    icon: "tim-icons icon-pencil",
    component: editCliente,
    layout: "/admin"
  },
 /* {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }*/
];
export default routes;
