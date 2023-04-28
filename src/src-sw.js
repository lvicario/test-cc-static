import {offlineFallback} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';
import {precacheAndRoute} from 'workbox-precaching';

setDefaultHandler(new NetworkOnly());

offlineFallback();

precacheAndRoute(self.__WB_MANIFEST);
