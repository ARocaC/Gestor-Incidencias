import { LightningElement, wire } from 'lwc';
import getIncidencias from '@salesforce/apex/IncidenciaController.getIncidencias';

const COLUMNS = [
    {
        label: 'Nombre',
        fieldName: 'recordLink',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' },
            target: '_blank'
        }
    },
    { label: 'Estado', fieldName: 'Estado__c' },
    { label: 'Prioridad', fieldName: 'Prioridad__c' },
    { label: 'Fecha de Creación', fieldName: 'Fecha_Creacion__c', type: 'date' }
];

export default class IncidenciasList extends LightningElement {
    columns = COLUMNS;
    incidencias;
    error;

    @wire(getIncidencias)
    wiredIncidencias({ data, error }) {
        if (data) {
            this.incidencias = data.map(inc => ({
                ...inc,
                recordLink: '/' + inc.Id
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.incidencias = undefined;
        }
    }
}
