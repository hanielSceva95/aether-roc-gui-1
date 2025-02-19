/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SliceEditComponent } from './slice-edit.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { TemplateTemplate } from '../../../openapi3/aether/4.0.0/models/template-template';
import { VcsVcs } from '../../../openapi3/aether/4.0.0/models/vcs-vcs';

describe('VcsEditComponent', () => {
    let component: SliceEditComponent;
    let fixture: ComponentFixture<SliceEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SliceEditComponent],
            providers: [
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: { appearance: 'standard' },
                },
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatToolbarModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                MatSnackBarModule,
                MatSlideToggleModule,
                MatAutocompleteModule,
                MatSelectModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliceEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when loading data from the backend', () => {
        it('should populate all the fields', () => {
            const vcs: VcsVcs = {
                'default-behavior': 'DENY-ALL',
                description: 'Chicago Robots',
                'device-group': [
                    {
                        'device-group': 'acme-chicago-robots',
                        enable: true,
                    },
                ],
                'display-name': 'Chicago Robots VCS',
                enterprise: 'acme',
                filter: [
                    {
                        allow: false,
                        application: 'acme-dataacquisition',
                    },
                ],
                id: 'acme-chicago-robots',
                sd: 2973238,
                site: 'acme-chicago',
                slice: {
                    mbr: {
                        downlink: 5000000,
                        'downlink-burst-size': 600000,
                        uplink: 12,
                        'uplink-burst-size': 13,
                    },
                },
                sst: 79,
                upf: 'acme-chicago-pool-entry1',
            };

            component.populateFormData(vcs);

            expect(component.vcsForm.get('default-behavior').value).toEqual(
                vcs['default-behavior']
            );
            expect(component.vcsForm.get('description').value).toEqual(
                vcs['description']
            );
            expect(component.vcsForm.get('device-group').value).toEqual(
                vcs['device-group']
            );
            expect(component.vcsForm.get('display-name').value).toEqual(
                vcs['display-name']
            );
            expect(component.vcsForm.get('enterprise').value).toEqual(
                vcs['enterprise']
            );
            expect(component.vcsForm.get(['filter', 0, 'allow']).value).toEqual(
                vcs['filter'][0].allow
            );
            expect(component.vcsForm.get('sd').value).toEqual(
                vcs.sd.toString(16).toUpperCase()
            );
            expect(component.vcsForm.get('site').value).toEqual(vcs['site']);
            expect(
                component.vcsForm.get(['slice', 'mbr', 'uplink']).value
            ).toEqual(vcs.slice.mbr.uplink);
            expect(
                component.vcsForm.get(['slice', 'mbr', 'downlink']).value
            ).toEqual(vcs.slice.mbr.downlink);
            expect(
                component.vcsForm.get(['slice', 'mbr', 'uplink-burst-size'])
                    .value
            ).toEqual(vcs.slice.mbr['uplink-burst-size']);
            expect(
                component.vcsForm.get(['slice', 'mbr', 'downlink-burst-size'])
                    .value
            ).toEqual(vcs.slice.mbr['downlink-burst-size']);
            expect(component.vcsForm.get('sst').value).toEqual(vcs['sst']);
            expect(component.vcsForm.get('upf').value).toEqual(vcs['upf']);
        });
    });

    it('check Application Endpoint validation', () => {
        component.applications = [
            {
                enterprise: 'test enterprise 1',
                address: 'test address 1',
                endpoint: [
                    {
                        'endpoint-id': 'test-endpoint-id',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                ],
                id: 'starbucks-nvr',
            },
        ];
        component.setShowAddFilterButton();
        expect(component.showAddFilterButton).toBeTruthy();
    });

    it('check Application Endpoint validation if it is invalid', () => {
        component.EndpointLeft = 5;
        component.applications = [
            {
                enterprise: 'test enterprise 2',
                address: 'test address 2',
                endpoint: [
                    {
                        'endpoint-id': 'test-endpoint-id-1',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                    {
                        'endpoint-id': 'test-endpoint-id-2',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                    {
                        'endpoint-id': 'test-endpoint-id-3',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                    {
                        'endpoint-id': 'test-endpoint-id-4',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                    {
                        'endpoint-id': 'test-endpoint-id-5',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                    {
                        'endpoint-id': 'test-endpoint-id-6',
                        'port-start': 1,
                        'traffic-class': 'test-traffic-2',
                    },
                ],
                id: 'starbucks-nvr',
            },
        ];
        component.setShowAddFilterButton();
        expect(component.showAddFilterButton).toBeTruthy();
    });

    describe('when selecting a template', () => {
        const template: TemplateTemplate = {
            id: 'test-template',
            sd: 12, // FIXME the method fails if this value is not present
            slice: {
                mbr: {
                    'uplink-burst-size': 10,
                    'downlink-burst-size': 5,
                },
            },
            'default-behavior': 'ACCEPT-ALL',
        };
        beforeEach(() => {
            // pretend is a new instance
            component.isNewInstance = true;

            // simulate a change in the dropdown
            component.templateSelected({ value: template });
        });
        it('should populate the burst value', () => {
            // make sure the for is updated
            const ulBs = component.vcsForm.get([
                'slice',
                'mbr',
                'uplink-burst-size',
            ]).value;
            const dlBs = component.vcsForm.get([
                'slice',
                'mbr',
                'downlink-burst-size',
            ]).value;
            const db = component.vcsForm.get(['default-behavior']).value;

            expect(ulBs).toEqual(template.slice.mbr['uplink-burst-size']);
            expect(dlBs).toEqual(template.slice.mbr['downlink-burst-size']);
            expect(db).toEqual(template['default-behavior']);
        });
    });
});
