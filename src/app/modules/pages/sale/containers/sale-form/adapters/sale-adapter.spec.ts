import { SaleAdapter } from './sale-adapter';

describe('SaleAdapter', () => {
  it('debería construir una instancia de SaleAdapter', () => {
    const saleData = {
      id: 1,
      documentType: 'DNI',
      documentNumber: '123456789',
    };

    const saleAdapter = new SaleAdapter(saleData);

    expect(saleAdapter).toBeDefined();
  });

  it('debería asignar valores de entrada correctamente', () => {
    const saleData = {
      id: 1,
      documentType: 'DNI',
      documentNumber: '123456789',
      customerName: 'Juan',
    };

    const saleAdapter = new SaleAdapter(saleData);

    expect(saleAdapter.documentType).toBe(saleData.documentType);
    expect(saleAdapter.documentNumber).toBe(saleData.documentNumber);
    expect(saleAdapter.customerName).toBe(saleData.customerName);
  });

  it('debería asignar valores de nombre correctamente', () => {
    const saleData = {
      documentType: 1,
    };
    const dependencyItems = {
      documentTypes: [
        { id: 1, name: 'DNI' },
        { id: 2, name: 'Pasaporte' },
      ],
    };

    const saleAdapter = new SaleAdapter(saleData, dependencyItems);

    expect(saleAdapter.documentTypeName).toBe('DNI');
  });
});
