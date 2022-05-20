import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/model/articulo';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { CrudArticulosService } from 'src/app/servicios/crud-articulos.service';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-pagina-carrito',
  templateUrl: './pagina-carrito.component.html',
  styleUrls: ['./pagina-carrito.component.css']
})
export class PaginaCarritoComponent implements OnInit {
  public carrito: Array<Articulo> = [];
  public factura: Array<Articulo> = [];
  public granTotal: number = 0;
  public granTotalFactura: number = 0;
  public usuario: any;
  public invoice: number = 0;
  public fechaCompra: any;
  public gastosEnvio: number = 15.32;
  public gastosTotales: string = "0";
  public finalizadaCompra: boolean = false;

  constructor(private servicioCarrito: CarritoService, private servicioArticulos: CrudArticulosService, private ruta: ActivatedRoute, private router: Router) {
   }

   /**
    * Al iniciar la página, llamamos al servicio carrito y guardamos en nuestras variables array carrito y granTotal las respuestas
    * y llamamos al servicio carrito para que nos devuela el carrito del usuario actual
    * invoice es un número de 6 cifras que usaremos para simular el nº de pedido de la factura
    * cogemos la fecha y hora actual y los guardamos en una variable, finalmente sumamos granTotal con los gastos de envío
    */
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
    this.gastosTotales = (this.granTotal+this.gastosEnvio).toFixed(2);
  }

  //borra un artículo del carrito
  borrarArticulo(articulo: Articulo): void{
    this.servicioCarrito.borrarArticulo(articulo);
  }

  //llama al servicio y borra todos los articulos
  borrarTodos(): void{
    this.servicioCarrito.borrarTodo();
  }

  //llama al servicio carrito y resta la cantidad, si es igual o menor a 0 se eliminará
  restarUnidades(articulo: Articulo): void{
      this.servicioCarrito.restarUnidades(articulo);
      if(articulo['cantidad'] <= 0){
        this.servicioCarrito.borrarArticulo(articulo);
      }
  }

  //llama al servicio y suma la cantidad de articulos comprados, si es mayor que el stock se notificará al usuario
  aumentarUnidades(articulo: Articulo): void{
    if(articulo['cantidad'] < articulo.stock){
      this.servicioCarrito.aumentarUnidades(articulo);
    }else{
      alert("Has superado el límite de stock de este producto!");
    }
  }

  /**
   * Para cada artículo del carrito, actualizamos la cantidad de stock llamando al servicio y los añadimos a otro array para la factura
   * cambiamos la variable finalizadaCompra a true apra el ngIf del html y el granTotal lo pasamos al granTotalFactura
   * finalmente borramos todos los artículos del carrito para que no vuelvan a salir
   */
  finalizarCompra(): void{
    this.carrito.forEach(articulo => {
      this.servicioArticulos.actualizarArticulo(articulo).subscribe(respuesta => { respuesta }); 
      this.factura.push(articulo);
    });
    this.finalizadaCompra = true;
    this.granTotalFactura = this.granTotal;
    this.borrarTodos();
  }

  /**
   * Si el usuario decide darle click al botón de descargar factura, hacemos uso de una librería que hemos encontrado que recoge lo que está actualmente en
   * una etiqueta del html y generará un pdf
   */
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
      docResult.save(`Factura_Oniline_Store_${this.usuario.nombre+"_"+this.usuario.apellidos+"_"+new Date().toISOString()}.pdf`);
    });
  }

}
