import { EventEmitter, Inject, Injectable, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ICrudder } from '../../interfaces/icrudder';
import { MasterCrudService } from '../../services/master-crud/master-crud.service';
import { commonFieldsModelForms } from '../../common-fields/common-fields.model';
import { SmarOverlayContainerService } from '../../services/zb-overlay-container/zb-overlay-container.service';
import { IControls } from '../../interfaces/icontrols';
import { FormErrorsService } from '../../services/form-errors/form-errors.service';

@Injectable()
export abstract class MasterForm implements OnInit, OnDestroy {
  protected crudder: ICrudder;
  protected subscriptions: Subscription[] = [];

  form: FormGroup;
  dependencyItems: any = {} as any;
  editForm: boolean;

  @Output() exit: EventEmitter<void> = new EventEmitter();

  constructor(
    fb: FormBuilder,
    protected crudService: MasterCrudService,
    protected smarOverlayContainerService: SmarOverlayContainerService,
    protected formErrorsService: FormErrorsService,
    @Inject('dependencies') protected dependencies: any[],
    @Inject('adapter') protected adapter: any,
    @Inject('uri') protected uri: string,
    @Inject('dataForm') protected dataForm: any,
  ) {
    this.form = commonFieldsModelForms(fb);
    this.crudder = crudService.getCrudder(uri, '');
    this.editForm = !!dataForm?.data?.id;
    if (this.editForm) {
      this.form.get('id')?.setValue(dataForm?.data?.id);
    }
  }

  ngOnInit() {
    if (this.dataForm?.data) {
      this.form.patchValue(new this.adapter(this.dataForm?.data));
    }
    for (const dependency of this.dependencies) {
      const sub = this.crudService.getDependency(dependency.path).subscribe((items) => {
        this.dependencyItems[dependency.name] = items;
      });
      this.subscriptions.push(sub);
    }
  }

  addControls(controls: IControls[]) {
    if (controls.length) {
      const [control] = controls;
      this.form.addControl(control.name, control.control);
      controls.shift();
      this.addControls(controls);
    }
  }

  close(): void {
    this.exit.emit();
    this.smarOverlayContainerService.close();
  }

  onSave(returnObs: boolean = false): Observable<any> | void {
    if (!this.isValidForm()) return;
    return this._send(returnObs);
  }

  protected _send(returnObs: boolean = false): Observable<any> | void {
    const body = this.getBody();
    const request = this.editForm ? this.crudder.put(body) : this.crudder.post(body);
    if (!this.editForm) {
      delete body['id'];
    }

    if (returnObs) {
      return request;
    }
    this._sendRequest(request);
  }

  private _sendRequest(request: Observable<any>): void {
    const sub = request.subscribe({
      next: () => {
        this.close();
      },
      error: ({ error }) => {
        console.log(error);
      },
    });
    this.subscriptions.push(sub);
  }

  protected getBody() {
    return this.form.getRawValue();
  }

  isValidForm(): boolean {
    if (this.form.invalid) {
      this.formErrorsService.showFormErrors(this.form);
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }
}
