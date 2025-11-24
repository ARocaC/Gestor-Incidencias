import { LightningElement, api, wire } from 'lwc';
import getComentarios from '@salesforce/apex/ComentarioController.getComentarios';

export default class ComentariosList extends LightningElement {
    @api recordId; // ID de la incidencia

    comentarios;
    error;

    @wire(getComentarios, { incidenciaId: '$recordId' })
    wiredComentarios({ data, error }) {
        if (data) {
            this.comentarios = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.comentarios = undefined;
        }
    }
}
