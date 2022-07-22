import list from './subPages/list'
import New from './subPages/new'
import update from './subPages/update'
export default [
    {
        path: '/tags',
        name: 'tags',
        component: list
    },
    {
        path: '/tags/new',
        name: 'New tag',
        component: New
      },
      {
        path: '/tags/:id',
        name: 'Update tag',
        component: update
      }
    ]