import { LightningElement, api, wire } from 'lwc';
import getIncidencia from '@salesforce/apex/IncidenciaController.getIncidencia';

export default class IncidenciaDetalle extends LightningElement {
    @api recordId;

    incidencia;
    error;

    @wire(getIncidencia, { incidenciaId: '$recordId' })
    wiredIncidencia({ data, error }) {
        if (data) {
            this.incidencia = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.incidencia = undefined;
        }
    }
}
