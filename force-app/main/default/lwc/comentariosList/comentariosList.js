import { LightningElement, api, track, wire } from 'lwc';
import getComentarios from '@salesforce/apex/ComentarioController.getComentarios';
import crearComentario from '@salesforce/apex/ComentarioController.crearComentario';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ComentariosList extends LightningElement {
    @api incidenciaId;
    @track comentarios = [];
    @track nuevoComentario = '';
    @track error;

    @wire(getComentarios, { incidenciaId: '$incidenciaId' })
    wiredComentarios({ data, error }) {
        if (data) {
            this.comentarios = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.comentarios = [];
        }
    }

    handleInputChange(event) {
        this.nuevoComentario = event.target.value;
    }

    async handleAddComment() {
        if (!this.nuevoComentario || !this.incidenciaId) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Debe escribir un comentario antes de enviarlo.',
                    variant: 'warning'
                })
            );
            return;
        }

        try {
            await crearComentario({
                incidenciaId: this.incidenciaId,
                texto: this.nuevoComentario
            });

            this.nuevoComentario = '';
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Éxito',
                    message: 'Comentario agregado correctamente.',
                    variant: 'success'
                })
            );

            // Refrescar comentarios manualmente
            return refreshApex(this.comentarios);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error al crear comentario',
                    message: error.body?.message || error.message,
                    variant: 'error'
                })
            );
        }
    }
}
