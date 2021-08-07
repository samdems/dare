import list from './subPages/list'
import New from './subPages/new'
import update from './subPages/update'
export default [
    {
        path: '/players',
        name: 'players',
        component: list
    },
    {
        path: '/players/new',
        name: 'player new',
        component: New
      },
      {
        path: '/players/:id',
        name: 'player update',
        component: update
      }
    ]