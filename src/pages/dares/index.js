import list from './subPages/list'
import New from './subPages/new'
import update from './subPages/update'
export default [
    {
        path: '/dares',
        name: 'Dares',
        component: list
    },
    {
        path: '/dares/new',
        name: 'new dare',
        component: New
      },
      {
        path: '/dares/:id',
        name: 'Updare dare ',
        component: update
      }
    ]