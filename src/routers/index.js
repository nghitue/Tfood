
// Layouts
import { NoSearchBar } from '@/components/Layout'

// Pages
import Home from '@/pages/Home';
import OrderList from '@/pages/OrderList';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

// Public routes
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '*', component: NotFound, layout: null},
]

const privateRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, layout: null },
  { path: '*', component: NotFound, layout: null},
  { path: '/order-list', component: OrderList, layout: NoSearchBar},
]

export { publicRoutes, privateRoutes }