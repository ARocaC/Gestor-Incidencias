import { LightningElement, track } from 'lwc';
import crearIncidencia from '@salesforce/apex/IncidenciaController.crearIncidencia';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CrearIncidencia extends LightningElement {
    @track titulo = '';
    @track descripcion = '';
    @track estado = '';
    @track prioridad = '';

    // Opciones de picklist
    get estadoOptions() {
        return [
            { label: 'Nueva', value: 'Nueva' },
            { label: 'En progreso', value: 'En progreso' },
            { label: 'Cerrada', value: 'Cerrada' }
        ];
    }

    get prioridadOptions() {
        return [
            { label: 'Baja', value: 'Baja' },
            { label: 'Media', value: 'Media' },
            { label: 'Alta', value: 'Alta' }
        ];
    }

    handleTituloChange(event) {
        this.titulo = event.target.value;
    }

    handleDescripcionChange(event) {
        this.descripcion = event.target.value;
    }

    handleEstadoChange(event) {
        this.estado = event.detail.value;
    }

    handlePrioridadChange(event) {
        this.prioridad = event.detail.value;
    }

    async handleSubmit() {
        try {
            await crearIncidencia({
                titulo: this.titulo,
                descripcion: this.descripcion,
                estado: this.estado,
                prioridad: this.prioridad
            });

            // Limpiamos formulario
            this.titulo = '';
            this.descripcion = '';
            this.estado = '';
            this.prioridad = '';

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Éxito',
                    message: 'Incidencia creada correctamente',
                    variant: 'success'
                })
            );
        } catch (error) {
            console.error('Error al crear la incidencia', error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Error al crear la incidencia',
                    variant: 'error'
                })
            );
        }
    }
}
