/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BasketService, ORIGINAL } from '../../basket.service';
import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { RocEditBase } from '../../roc-edit-base';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenPolicyAgentService } from '../../open-policy-agent.service';
import { RocElement } from '../../../openapi3/top/level/models/elements';
import { EnterpriseEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-sim-card';
import { SimCardSimCardService } from '../../../openapi3/aether/2.0.0/services/sim-card-sim-card.service';

@Component({
    selector: 'aether-sim-card-edit',
    templateUrl: './sim-card-edit.component.html',
    styleUrls: ['../../common-edit.component.scss'],
})
export class SimCardEditComponent extends RocEditBase implements OnInit {
    data: EnterpriseEnterpriseSiteSimCard;
    pathRoot = ('Enterprises-2.0.0/enterprise' +
        '[enterprise-id=' +
        this.route.snapshot.params['enterprise-id'] +
        ']/site' +
        '[site-id=' +
        this.route.snapshot.params['site-id'] +
        ']') as RocElement;
    pathListAttr = 'sim-card';
    SimCardId: string;
    showParentDisplay = false;
    simCardForm = this.fb.group({
        'sim-id': [
            undefined,
            Validators.compose([
                Validators.pattern('([A-Za-z0-9\\-\\_\\.]+)'),
                Validators.minLength(1),
                Validators.maxLength(31),
            ]),
        ],
        'display-name': [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(80),
            ]),
        ],
        description: [
            undefined,
            Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(1024),
            ]),
        ],
        imsi: [undefined],
        iccid: [undefined],
    });

    constructor(
        private simCardSimCardService: SimCardSimCardService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected fb: FormBuilder,
        protected bs: BasketService,
        protected snackBar: MatSnackBar,
        public opaService: OpenPolicyAgentService
    ) {
        super(snackBar, bs, route, router, 'Enterprises-2.0.0', 'sim-card');
        super.form = this.simCardForm;
        super.loadFunc = this.loadSimCardSimCard;
    }

    ngOnInit(): void {
        super.init();
    }

    loadSimCardSimCard(target: string, id: string): void {
        this.simCardSimCardService
            .getSimCardSimCard({
                target,
                id,
                ent_id: this.route.snapshot.params['ent-id'],
                site_id: this.route.snapshot.params['site-id'],
            })
            .subscribe(
                (value) => {
                    this.data = value;
                    this.SimCardId = value['sim-id'];
                    this.populateFormData(value);
                },
                (error) => {
                    console.warn(
                        'Error getting SimCardSimCard(s) for ',
                        target,
                        error
                    );
                },
                () => {
                    const basketPreview = this.bs.buildPatchBody().Updates;
                    if (
                        this.pathRoot in basketPreview &&
                        this.pathListAttr in basketPreview['Sim-card-2.0.0']
                    ) {
                        basketPreview['Sim-card-2.0.0']['sim-card'].forEach(
                            (basketItems) => {
                                if (basketItems.id === id) {
                                    this.populateFormData(basketItems);
                                }
                            }
                        );
                    }
                    console.log(
                        'Finished loading SimCardSimCard(s)',
                        target,
                        id
                    );
                }
            );
    }

    private populateFormData(value: EnterpriseEnterpriseSiteSimCard): void {
        if (value['sim-id']) {
            this.simCardForm.get('sim-id').setValue(value['sim-id']);
            this.simCardForm.get('sim-id')[ORIGINAL] = value['sim-id'];
        }
        if (value['display-name']) {
            this.simCardForm
                .get('display-name')
                .setValue(value['display-name']);
            this.simCardForm.get('display-name')[ORIGINAL] =
                value['display-name'];
        }
        if (value.description) {
            this.simCardForm.get('description').setValue(value.description);
            this.simCardForm.get('description')[ORIGINAL] = value.description;
        }
        if (value.iccid) {
            this.simCardForm.get('iccid').setValue(value.iccid);
            this.simCardForm.get('iccid')[ORIGINAL] = value.iccid;
        }
        if (value.imsi) {
            this.simCardForm.get('imsi').setValue(value.imsi);
            this.simCardForm.get('imsi')[ORIGINAL] = value.imsi;
        }
    }
}
