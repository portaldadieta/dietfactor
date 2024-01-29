/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class RouteService implements OnDestroy{
    static AUTH_ROUTE = '/auth';
    router: Router = inject(Router);
    actualRoute = signal('');
    destroy$ = new Subject();
    constructor() {}
    ngOnDestroy(): void {
        this.destroy$.unsubscribe();
    }
    returnsActualRoute(): string {
        this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: any)=>{
            this.actualRoute.set(event.url);
        });
        return this.actualRoute();
    }

}
