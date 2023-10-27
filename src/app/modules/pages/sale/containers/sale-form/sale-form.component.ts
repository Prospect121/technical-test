import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IControls } from 'src/app/core/interfaces/icontrols';
import { MasterForm } from 'src/app/core/model/master-form/master-form';
import { FormErrorsService } from 'src/app/core/services/form-errors/form-errors.service';
import { MasterCrudService } from 'src/app/core/services/master-crud/master-crud.service';
import { SmarOverlayContainerService } from 'src/app/core/services/zb-overlay-container/zb-overlay-container.service';
import { SaleAdapter } from './adapters/sale-adapter';
import regExp from 'src/app/shared/regExp';
import { environment } from 'src/environments/environment';

const paths = environment.paths;

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss'],
  providers: [
    {
      provide: 'dependencies',
      useValue: [
        { path: paths.documentType, name: 'documentTypes' },
        { path: paths.internationalShippingType, name: 'internationalShippingTypes' },
        { path: paths.operator, name: 'selectOperators' },
        { path: paths.paymentMethod, name: 'paymentMethods' },
        { path: paths.transferType, name: 'transferTypeSelects' },
        { path: paths.commercialMakeSale, name: 'commercialMakeSales' },
      ],
    },
    { provide: 'adapter', useValue: SaleAdapter },
    { provide: 'uri', useValue: paths.sale },
  ],
})
export class SaleFormComponent extends MasterForm implements OnInit {
  constructor(
    protected fb: FormBuilder,
    crudService: MasterCrudService,
    smarOverlayContainerService: SmarOverlayContainerService,
    formErrorsService: FormErrorsService,
    @Inject('dependencies') protected override dependencies: any[],
    @Inject('adapter') protected override adapter: any,
    @Inject('uri') protected override uri: string,
    @Inject('dataForm') protected override dataForm: any,
  ) {
    super(fb, crudService, smarOverlayContainerService, formErrorsService, dependencies, adapter, uri, dataForm);
    this.addControls(this._loadForm());
  }

  get shippingTypeField(): AbstractControl | null {
    return this.form.get('shippingType');
  }

  get internationalShippingTypeField(): AbstractControl | null {
    return this.form.get('internationalShippingType');
  }

  get paymentMethodTypeField(): AbstractControl | null {
    return this.form.get('paymentMethod');
  }

  get transferTypeField(): AbstractControl | null {
    return this.form.get('transferType');
  }

  override ngOnInit(): void {
    this.addControls(this._loadForm());
    super.ngOnInit();
    this.dependencyItems['numberPackages'] = Array.from({ length: 50 - 1 + 1 }, (_, index) => 1 + index);

    if (!this.editForm) {
      this.shippingTypeField?.setValue('NATIONAL');
    }

    if (this.shippingTypeField) {
      const sub = this.shippingTypeField.valueChanges.subscribe((value) => {
        if (value && value == 'INTERNATIONAL') {
          this.internationalShippingTypeField?.enable();
          return;
        }
        this.internationalShippingTypeField?.disable();
      });
      this.subscriptions.push(sub);
    }

    if (this.paymentMethodTypeField) {
      const sub = this.paymentMethodTypeField.valueChanges.subscribe((value) => {
        if (value) {
          this.transferTypeField?.enable();
          return;
        }
        this.transferTypeField?.disable();
      });
      this.subscriptions.push(sub);
    }
  }

  protected override getBody() {
    return new SaleAdapter(this.form.getRawValue(), this.dependencyItems);
  }

  private _loadForm(): IControls[] {
    return [
      {
        name: 'documentType',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'documentNumber',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'customerName',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'clientLastName',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'customerEmail',
        control: this.fb.control('', [Validators.required, Validators.email]),
      },
      {
        name: 'cellPhone',
        control: this.fb.control('', [Validators.required, Validators.pattern(regExp.cellPhone)]),
      },
      {
        name: 'shippingType',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'internationalShippingType',
        control: this.fb.control({ value: '', disabled: true }, Validators.required),
      },
      {
        name: 'selectOperator',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'numberPackage',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'guideNumber',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'saleValue',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'paymentMethod',
        control: this.fb.control('', Validators.required),
      },
      {
        name: 'transferType',
        control: this.fb.control({ value: '', disabled: true }, Validators.required),
      },
      {
        name: 'commercialMakeSale',
        control: this.fb.control('', Validators.required),
      },
    ];
  }
}
