/*
 * SPDX-FileCopyrightText: 2021-present Open Networking Foundation <info@opennetworking.org>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service as AetherService } from '../../../openapi3/aether/2.0.0/services';
import { BasketService } from '../../basket.service';
import { RocDataSource } from '../../roc-data-source';
import { EnterpriseEnterpriseSiteSimCard } from '../../../openapi3/aether/2.0.0/models/enterprise-enterprise-site-sim-card';
import { SimCard } from '../../../openapi3/aether/2.0.0/models/sim-card';

export class SimCardDatasource extends RocDataSource<
    EnterpriseEnterpriseSiteSimCard,
    SimCard
> {
    constructor(
        protected aetherService: AetherService,
        public bs: BasketService,
        protected target: string
    ) {
        super(aetherService, bs, target, '/sim-card-2.0.0', 'sim-card');
    }
}
