import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from '../container/defaultlayout/defaultlayout.js';

function Loading(){
  return <div> </div>
}


const ListingPage = Loadable({
  loader: () => import('../views/listingpage/listingpage.js'),
  loading: Loading,
});

const CreatePage = Loadable({
  loader: () => import('../views/createpage/createpage.js'),
  loading: Loading,
});

const UpdatePage = Loadable({
  loader: () => import('../views/updatepage/updatepage.js'),
  loading: Loading,
});




const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/listingpage', exact: true, name: 'Listing Page', component: ListingPage },
  { path: '/createpage', name: 'Create Page', component: CreatePage },
  { path: '/updatepage', name: 'Update Page', component: UpdatePage },

];

export default routes;
