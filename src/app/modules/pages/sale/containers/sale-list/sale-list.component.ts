import { Component } from '@angular/core';
import { SmarOverlayContainerService } from 'src/app/core/services/zb-overlay-container/zb-overlay-container.service';

import { MasterList } from 'src/app/core/model/mastar-list/master-list';
import { MasterCrudService } from 'src/app/core/services/master-crud/master-crud.service';
import { environment } from 'src/environments/environment';

const paths = environment.paths;

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss'],
})
export class SaleListComponent extends MasterList {
  displayedColumns: string[] = ['pointSale', 'nameOperator', 'date', 'sale', 'action'];

  constructor(
    protected override crudService: MasterCrudService,
    protected override smarOverlayContainerService: SmarOverlayContainerService,
  ) {
    super(crudService, { uri: `${paths.sale}`, uriComplement: '' }, smarOverlayContainerService);
  }
}
