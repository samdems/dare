import list from './subPages/list'
import New from './subPages/new'
import update from './subPages/update'
export default [
    {
        path: '/dares',
        name: 'dares',
        component: list
    },
    {
        path: '/dares/new',
        name: 'dare new',
        component: New
      },
      {
        path: '/dares/:id',
        name: 'dare updare',
        component: update
      }
    ]