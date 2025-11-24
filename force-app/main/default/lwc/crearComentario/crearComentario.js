import { LightningElement, api, track } from 'lwc';
import crearComentario from '@salesforce/apex/ComentarioController.crearComentario';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CrearComentario extends LightningElement {
    @api recordId; // ID de la incidencia
    @track texto = '';

    handleTextoChange(event) {
        this.texto = event.target.value;
    }

    async handleSubmit() {
        try {
            if (!this.texto) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'El comentario no puede estar vacío.',
                        variant: 'warning'
                    })
                );
                return;
            }

            await crearComentario({
                incidenciaId: this.recordId,
                texto: this.texto
            });

            this.texto = '';

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Éxito',
                    message: 'Comentario creado correctamente',
                    variant: 'success'
                })
            );

            this.dispatchEvent(new CustomEvent('comentariocreado'));
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body?.message || error.message,
                    variant: 'error'
                })
            );
        }
    }
}
