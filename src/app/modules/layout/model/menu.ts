import { MenuItem } from '../interfaces/menu';

export class Menu {
  public pages: MenuItem[] = [
    {
      group: 'Modules',
      separator: false,
      items: [
        {
          icon: 'assets/icons/outline/sale.svg',
          label: 'masters.menu.sale',
          route: `/sale`,
        },
        {
          icon: 'assets/icons/outline/pie.svg',
          label: 'masters.menu.covid',
          route: `/report-covid`,
        },
      ],
    },
  ];
}
