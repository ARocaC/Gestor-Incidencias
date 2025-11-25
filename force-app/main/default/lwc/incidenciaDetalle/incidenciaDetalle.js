import { LightningElement, api, wire } from 'lwc';
import getIncidencia from '@salesforce/apex/IncidenciaController.getIncidencia';
import actualizarEstado from '@salesforce/apex/IncidenciaController.actualizarEstado';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class IncidenciaDetalle extends LightningElement {
    @api recordId;

    incidencia;
    error;

    showModal = false;
    nuevoEstado = '';

    wiredData;

    estadoOptions = [
        { label: 'Nuevo', value: 'Nuevo' },
        { label: 'En progreso', value: 'En progreso' },
        { label: 'Cerrado', value: 'Cerrado' }
    ];

    @wire(getIncidencia, { incidenciaId: '$recordId' })
    wiredIncidencia(result) {
        this.wiredData = result;
        if (result.data) {
            this.incidencia = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.incidencia = undefined;
        }
    }

    // Abrir Modal
    openModal() {
        this.showModal = true;
        this.nuevoEstado = this.incidencia?.Estado__c;
    }

    // Cerrar Modal
    closeModal() {
        this.showModal = false;
    }

    // Cambiar picklist
    handleEstadoChange(event) {
        this.nuevoEstado = event.detail.value;
    }

    // Guardar cambio en Apex
    async guardarEstado() {
        try {
            await actualizarEstado({
                incidenciaId: this.recordId,
                nuevoEstado: this.nuevoEstado
            });

            this.showModal = false;

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Estado actualizado',
                    message: 'El estado se ha cambiado correctamente.',
                    variant: 'success'
                })
            );

            // Recargar datos
            await refreshApex(this.wiredData);

        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}
