import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import { Route } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
import { Store } from 'vuex';

export interface IContext {
    app: Vue;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    store: Store<any>;
    env: any;
    params: Dictionary<string>;
    query: Dictionary<string>;
    req: Request;
    res: Response;
    redirect: () => void;
    error: () => void;
    nuxtState: any;
    beforeNuxtRender: () => void;
    $axios: NuxtAxiosInstance;
    $vuetify: any;
    $route: Route;
}

declare module 'vue/types/options' {
    // export interface Context {
    //     app: Vue;
    //     isClient: boolean;
    //     isServer: boolean;
    //     isStatic: boolean;
    //     isDev: boolean;
    //     isHMR: boolean;
    //     route: Route;
    //     store: Store<any>;
    //     env: any;
    //     params: Dictionary<string>;
    //     query: Dictionary<string>;
    //     req: Request;
    //     res: Response;
    //     redirect: Function;
    //     error: Function;
    //     nuxtState: any;
    //     beforeNuxtRender: Function;
    // }

    export interface Transition {
        name?: string;
        mode?: string;
        css?: boolean;
        duration?: number;
        type?: string;
        enterClass?: string;
        enterToClass?: string;
        enterActiveClass?: string;
        leaveClass?: string;
        leaveToClass?: string;
        leaveActiveClass?: string;
    }
    export interface ComponentOptions<V extends Vue> {
        asyncData?: (ctx: IContext) => object;
        fetch?: (ctx: IContext) => Promise<void> | void;
        head?: MetaInfo | (() => MetaInfo);
        layout?: string | ((ctx: IContext) => string);
        middleware?: string | string[];
        scrollToTop?: boolean;
        transition?: string | Transition | ((to: Route, from: Route) => string);
        validate?: (ctx: IContext) => Promise<boolean> | boolean;
        watchQuery?: boolean | string[];
    }
}
