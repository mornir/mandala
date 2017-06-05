import ListeMandats from './components/ListeMandats.vue';
import StepperMandat from './components/StepperMandat.vue';
import SearchMandat from './components/SearchMandat.vue';
import Settings from './components/Settings.vue';
import EditMandat from './components/EditMandat.vue';
import MesMandats from './components/MesMandats.vue';

export const routes = [
    {
        path: '/',
        component: ListeMandats
    },
    {
        path: '/mesmandats',
        component: MesMandats
    },
    {
        path: '/nouveau',
        component: StepperMandat
    },
    {
        path: '/rechercher',
        component: SearchMandat
    },
    {
        path: '/parametres',
        component: Settings
    },
    {
        path: '/edit/:key',
        name: 'edit',
        component: EditMandat
    }
];
