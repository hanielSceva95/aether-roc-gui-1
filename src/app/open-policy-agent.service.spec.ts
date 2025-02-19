/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { TestBed } from '@angular/core/testing';

import { OpenPolicyAgentService } from './open-policy-agent.service';

describe('OpenPolicyAgentService', () => {
    let service: OpenPolicyAgentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OpenPolicyAgentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should validate canwrite function', () => {
        service.canWrite('/application/application[id=testID]');
        expect(service).toBeTruthy();
    });

    it('should validate canwrite for undefined', () => {
        service.canWrite(undefined);
        expect(service).toBeTruthy();
    });
});
