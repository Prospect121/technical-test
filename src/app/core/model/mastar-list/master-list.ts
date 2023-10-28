import { MasterCrudService } from './../../services/master-crud/master-crud.service';
import { ICrudder } from './../../interfaces/icrudder';
import { AfterViewInit, ChangeDetectorRef, Directive, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';
import { SmarOverlayContainerService } from '../../services/overlay-container/overlay-container.service';

import { ComponentPortal } from '@angular/cdk/portal';
import { SaleFormComponent } from 'src/app/modules/pages/sale/containers/sale-form/sale-form.component';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface IMasterListConfig {
  uri: string;
  uriComplement: string;
}

@Directive()
export abstract class MasterList implements OnDestroy, AfterViewInit {
  crudder: ICrudder;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  obs: Observable<any> = new Observable<any>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  protected subscriptions: Subscription[] = [];

  constructor(
    protected crudService: MasterCrudService,
    @Inject('masterConfig') protected masterConfig: IMasterListConfig,
    protected smarOverlayContainerService: SmarOverlayContainerService,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    this.crudder = crudService.getCrudder(masterConfig.uri, masterConfig.uriComplement);
    this.search();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatTableDataSourcePaginator;
    this.dataSource.sort = this.sort as MatSort;
    this.obs = this.dataSource.connect();
    this.changeDetectorRef.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource);
    }
  }

  edit(id: number): void {
    this._onForm(id);
  }

  createItem(): void {
    this._onForm();
  }

  search() {
    this._getItems();
  }

  remove(id: string) {
    this._deleteItem(id);
  }

  private _getItems(): void {
    const sub = this.crudder.get().subscribe((content) => {
      this._processDataFilter(content);
    });
    this.subscriptions.push(sub);
  }

  private _processDataFilter(content: any[]): void {
    this.dataSource = new MatTableDataSource(content);
    this.dataSource.paginator = this.paginator as MatTableDataSourcePaginator;
    this.dataSource.sort = this.sort as MatSort;
    this.obs = this.dataSource.connect();
  }

  private _deleteItem(itemId: string) {
    this.crudder.delete(itemId).subscribe(() => {
      this.dataSource.data = [];
      this.search();
    });
  }

  private _onForm(id?: number): void {
    const data = id ? this.dataSource.data.find((value) => +value?.id === +id) : {};
    const componentPortal = new ComponentPortal(
      SaleFormComponent,
      null,
      Injector.create({
        providers: [
          {
            provide: 'dataForm',
            useValue: {
              data,
            },
          },
        ],
      }),
    );
    const componentPortalInstance = this.smarOverlayContainerService.open(componentPortal);
    const sub = componentPortalInstance?.exit?.subscribe(() => {
      this.dataSource.data = [];
      this.search();
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub && sub.unsubscribe());
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
