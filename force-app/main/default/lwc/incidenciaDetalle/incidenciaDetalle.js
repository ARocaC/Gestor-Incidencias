import { LightningElement, api, wire } from 'lwc';
import getIncidencias from '@salesforce/apex/IncidenciaController.getIncidencias';
import cerrarIncidencia from '@salesforce/apex/IncidenciaController.cerrarIncidencia';
import { refreshApex } from '@salesforce/apex';
import actualizarIncidencia from '@salesforce/apex/IncidenciaController.actualizarIncidencia';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class IncidenciaDetalle extends LightningElement {
    @api recordId;

    incidencia;
    error;
    wiredData;

    showEstadoModal = false;
    showPrioridadModal = false;

    nuevoEstado = '';
    nuevaPrioridad = '';

    estadoOptions = [
        { label: 'Nuevo', value: 'Nuevo' },
        { label: 'En progreso', value: 'En progreso' }
    ];

    prioridadOptions = [
        { label: 'Baja', value: 'Baja' },
        { label: 'Media', value: 'Media' },
        { label: 'Alta', value: 'Alta' }
    ];

    @wire(getIncidencias)
    wiredIncidencia(result) {
        this.wiredData = result;
        if (result.data) {
            const lista = result.data || [];
            this.incidencia = this.recordId ? lista.find(i => i.Id === this.recordId) : (lista.length ? lista[0] : undefined);
            this.error = undefined;
        } else {
            this.error = result.error;
            this.incidencia = undefined;
        }
    }

    async handleCerrarIncidencia() {
        try {
            await cerrarIncidencia({ incidenciaId: this.recordId });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Incidencia cerrada',
                    message: 'La incidencia ha sido cerrada correctamente.',
                    variant: 'success'
                })
            );

            await refreshApex(this.wiredData);

        } catch (error) {
            this.showError(error);
        }
    }

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
            const prioridadActual = this.incidencia?.Prioridad__c || null;
            await actualizarIncidencia({ incidenciaId: this.recordId, estado: this.nuevoEstado, prioridad: prioridadActual });

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
            // No método dedicado en Apex; reutilizamos actualizarIncidencia pasando la prioridad nueva y manteniendo el estado actual
            const estadoActual = this.incidencia?.Estado__c || null;
            await actualizarIncidencia({ incidenciaId: this.recordId, estado: estadoActual, prioridad: this.nuevaPrioridad });

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
