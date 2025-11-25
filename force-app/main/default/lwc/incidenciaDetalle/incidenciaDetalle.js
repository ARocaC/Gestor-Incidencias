import { LightningElement, api, wire } from 'lwc';
import getIncidencia from '@salesforce/apex/IncidenciaController.getIncidencia';
import actualizarEstado from '@salesforce/apex/IncidenciaController.actualizarEstado';
import actualizarPrioridad from '@salesforce/apex/IncidenciaController.actualizarPrioridad';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class IncidenciaDetalle extends LightningElement {
    @api recordId;

    incidencia;
    error;
    wiredData;

    // Modales
    showEstadoModal = false;
    showPrioridadModal = false;

    // Valores temporales
    nuevoEstado = '';
    nuevaPrioridad = '';

    // Opciones picklists
    estadoOptions = [
        { label: 'Nueva', value: 'Nueva' },
        { label: 'En progreso', value: 'En progreso' },
        { label: 'Cerrado', value: 'Cerrado' }
    ];

    prioridadOptions = [
        { label: 'Baja', value: 'Baja' },
        { label: 'Media', value: 'Media' },
        { label: 'Alta', value: 'Alta' }
    ];

    @wire(getIncidencia, { incidenciaId: '$recordId' })
    wiredIncidencia(result) {
        this.wiredData = result;
        if (result.data) {
            this.incidencia = result.data;
            this.error = undefined;
        } else {
            this.error = result.error;
            this.incidencia = undefined;
        }
    }

    // --- MODAL ESTADO ---
    openEstadoModal() {
        this.nuevoEstado = this.incidencia?.Estado__c;
        this.showEstadoModal = true;
    }

    closeEstadoModal() {
        this.showEstadoModal = false;
    }

    handleEstadoChange(event) {
        this.nuevoEstado = event.detail.value;
    }

    async guardarEstado() {
        try {
            await actualizarEstado({ incidenciaId: this.recordId, nuevoEstado: this.nuevoEstado });

            this.closeEstadoModal();

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Estado actualizado',
                    message: 'El estado se actualizó correctamente.',
                    variant: 'success'
                })
            );

            await refreshApex(this.wiredData);
        } catch (error) {
            this.showError(error);
        }
    }

    // --- MODAL PRIORIDAD ---
    openPrioridadModal() {
        this.nuevaPrioridad = this.incidencia?.Prioridad__c;
        this.showPrioridadModal = true;
    }

    closePrioridadModal() {
        this.showPrioridadModal = false;
    }

    handlePrioridadChange(event) {
        this.nuevaPrioridad = event.detail.value;
    }

    async guardarPrioridad() {
        try {
            await actualizarPrioridad({ incidenciaId: this.recordId, nuevaPrioridad: this.nuevaPrioridad });

            this.closePrioridadModal();

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Prioridad actualizada',
                    message: 'La prioridad se actualizó correctamente.',
                    variant: 'success'
                })
            );

            await refreshApex(this.wiredData);
        } catch (error) {
            this.showError(error);
        }
    }

    showError(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: error.body?.message || error.message,
                variant: 'error'
            })
        );
    }
}
