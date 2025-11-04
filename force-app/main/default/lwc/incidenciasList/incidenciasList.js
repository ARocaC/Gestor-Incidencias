import { LightningElement, wire } from 'lwc';
import getIncidencias from '@salesforce/apex/IncidenciaController.getIncidencias';

const COLUMNS = [
    { label: 'Nombre', fieldName: 'Name' },
    { label: 'Estado', fieldName: 'Estado__c' },
    { label: 'Prioridad', fieldName: 'Prioridad__c' },
    { label: 'Fecha de Creación', fieldName: 'Fecha_Creacion__c', type: 'date' }
];

export default class IncidenciasList extends LightningElement {
    columns = COLUMNS;
    @wire(getIncidencias) incidencias;
}
