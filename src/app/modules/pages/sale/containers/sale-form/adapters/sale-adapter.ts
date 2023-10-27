export class SaleAdapter {
  id?: number;
  documentType: string;
  documentTypeName: string;
  documentNumber: string;
  customerName: string;
  clientLastName: string;
  customerEmail: string;
  cellPhone: string;
  shippingType: string;
  internationalShippingType: string;
  internationalShippingTypeName: string;
  selectOperator: string;
  selectOperatorName: string;
  numberPackage: number;
  guideNumber: number;
  saleValue: number;
  paymentMethod: string;
  paymentMethodName: string;
  transferType: string;
  transferTypeName: string;
  commercialMakeSale: string;
  commercialMakeSaleName: string;
  creationDate?: Date;

  constructor(sale: any, dependencyItems?: any) {
    ({
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      customerName: this.customerName,
      clientLastName: this.clientLastName,
      customerEmail: this.customerEmail,
      cellPhone: this.cellPhone,
      shippingType: this.shippingType,
      internationalShippingType: this.internationalShippingType,
      selectOperator: this.selectOperator,
      numberPackage: this.numberPackage,
      guideNumber: this.guideNumber,
      saleValue: this.saleValue,
      paymentMethod: this.paymentMethod,
      transferType: this.transferType,
      commercialMakeSale: this.commercialMakeSale,
      id: this.id,
    } = sale);

    this.creationDate = !sale?.id ? new Date() : sale?.creationDate;
    this.documentTypeName = this._filter(sale.documentType, dependencyItems?.['documentTypes']);
    this.internationalShippingTypeName = this._filter(
      sale.internationalShippingType,
      dependencyItems?.['internationalShippingTypes'],
    );
    this.selectOperatorName = this._filter(sale.selectOperator, dependencyItems?.['selectOperators']);
    this.paymentMethodName = this._filter(sale.paymentMethod, dependencyItems?.['paymentMethods']);
    this.transferTypeName = this._filter(sale.transferType, dependencyItems?.['transferTypeSelects']);
    this.commercialMakeSaleName = this._filter(sale.commercialMakeSale, dependencyItems?.['commercialMakeSales']);
  }

  private _filter(id: number, list: any[]): string {
    return (list || []).find((item) => +item.id === +id)?.name || '';
  }
}
