const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        meta: { admin: false, authenticated: true }, name: 'Home', path: '', component: () => import('pages/Index.vue'),
      },
      {
        meta: { admin: false, authenticated: true }, name: 'Room', path: 'room/:id', component: () => import('pages/rooms/Room.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
