import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-compra-finalizada',
  templateUrl: './compra-finalizada.component.html',
  styleUrls: ['./compra-finalizada.component.css']
})
export class CompraFinalizadaComponent implements OnInit {
  public carrito: Array<Articulo> = [];
  public granTotal: number = 0;
  public usuario: any;
  public invoice: number = 0;
  public fechaCompra: any;
  public gastosEnvio: number = 15.32;
  public gastosTotales: number = 0;
  constructor(private servicioCarrito: CarritoService, private servicioArticulos: CrudArticulosService) { }

  ngOnInit(): void {
    this.servicioCarrito.devolverProductos().subscribe( (respuesta: any) => {
      this.carrito = respuesta;
      this.granTotal = this.servicioCarrito.calcularTotal();
    });
    this.servicioCarrito.devolverUsuario().subscribe( (respuesta: any) => {
      this.usuario = respuesta;
    });

    this.invoice = Math.floor(100000 + Math.random() * 900000);
    let hoy = new Date();
    this.fechaCompra = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
    this.gastosTotales = this.granTotal+this.gastosEnvio;
    setTimeout(() => {
      this.generarFactura();
    }, 3000);
  }

  generarFactura(): void {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Factura_Tienda_Oniline_${this.usuario.nombre+"_"+this.usuario.apellidos+"_"+new Date().toISOString()}.pdf`);
    });
  }

}
