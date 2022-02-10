// GENERATED CODE -- DO NOT EDIT!
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {EnterpriseEnterpriseSiteSimCard} from "../models/enterprise-enterprise-site-sim-card";

@Injectable({
    providedIn: 'root',
})
export class SimCardSimCardService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

    /**
     * Path part for operation getSimCardSimCard
     */
    static readonly GetSimCardSimCardPath = '/aether/v2.0.0/{target}/enterprises/enterprise/{ent_id}/site/{site_id}/sim-card/{id}';

    /**
     * GET /simCard/simCard
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getSimCardSimCard()` instead.
     *
     * This method doesn't expect any request body.
     */
    getSimCardSimCard$Response(params: {

        /**
         * target (device in onos-config)
         */
        target: any;

        /**
         * key {id}
         */
        id: any;

        /**
         * key {ent-id}
         */
        ent_id: any;

        /**
         * key {ent-id}
         */
        site_id: any;
    }): Observable<StrictHttpResponse<EnterpriseEnterpriseSiteSimCard>> {
        console.log(this.rootUrl, SimCardSimCardService.GetSimCardSimCardPath, 'get',"this.rootUrl, SimCardSimCardService.GetSimCardSimCardPath, 'get'")
        const rb = new RequestBuilder(this.rootUrl, SimCardSimCardService.GetSimCardSimCardPath, 'get');
        if (params) {
            rb.path('target', params.target, {});
            rb.path('id', params.id, {});
            rb.path('ent_id', params['ent_id'], {});
            rb.path('site_id', params['site_id'], {});
        }

        return this.http.request(rb.build({
            responseType: 'json',
            accept: 'application/json'
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<EnterpriseEnterpriseSiteSimCard>;
            })
        );
    }

    /**
     * GET /sim-card/sim-card
     *
     *
     *
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `getSimCardSimCard$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getSimCardSimCard(params: {

        /**
         * target (device in onos-config)
         */
        target: any;

        /**
         * key {id}
         */
        id: any;

        /**
         * key {ent-id}
         */
        ent_id: any;

        /**
         * key {ent-id}
         */
        site_id: any;
    }): Observable<EnterpriseEnterpriseSiteSimCard> {
        debugger
        console.log(this.rootUrl, SimCardSimCardService.GetSimCardSimCardPath, 'get',"this.rootUrl, SimCardSimCardService.GetSimCardSimCardPath, 'get'")

        return this.getSimCardSimCard$Response(params).pipe(
            map((r: StrictHttpResponse<EnterpriseEnterpriseSiteSimCard>) => r.body as EnterpriseEnterpriseSiteSimCard)
        );
    }

}
