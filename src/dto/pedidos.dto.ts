export class PedidosDto {
  data: Date;
  observacao: string;
  pagamento: 'dinheiro' | 'cartão' | 'cheque';
  cliente: string;
}
