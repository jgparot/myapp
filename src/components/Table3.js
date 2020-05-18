import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function subventa(items){
  return items.map(({ qty }) => qty).reduce((sum, i) => sum + i, 0);
}

function subcompra(items){
  return items.map(({ unit }) => unit).reduce((sum, i) => sum + i, 0);
}



export default function SpanningTable(props) {
  const classes = useStyles();

  const rows = props.data;
const invoiceSubtotal = subtotal(rows);
const invoiceTotal = invoiceSubtotal / props.total;
const ventasTotal = subventa(rows);
const compraTotal = subcompra(rows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Acción</TableCell>
            <TableCell align="right">Volumen Venta</TableCell>
            <TableCell align="right">Volumen Compra</TableCell>
            <TableCell align="right">Volumen Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={5} />
            <TableCell colSpan={2}>Volumen Total de Compra</TableCell>
            <TableCell align="right">{ccyFormat(compraTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Volumen Total de Venta</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{ccyFormat(ventasTotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Volumen Total de Mercado</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Volumen Total Absoluto</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{props.total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Porcentaje de este mercado sobre el volumen total</TableCell>
            <TableCell align="right">{(ccyFormat(invoiceTotal)*100).toFixed(2)}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}