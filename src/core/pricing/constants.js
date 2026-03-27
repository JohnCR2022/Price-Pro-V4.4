export const FINANCIAL_CONFIG = {
  SUNAT: {
    IGV: 0.18,
    RER: 0.015
  },
  GATEWAYS: {
    CARD_INSTANT: { 
      id: 'CARD_INSTANT',
      name: 'Tarjeta (Al instante)', 
      rate: 0.0399, 
      fixed: 1.00,
      color: 'blue'
    },
    CARD_14D: { 
      id: 'CARD_14D',
      name: 'Tarjeta (14 días)', 
      rate: 0.0344, 
      fixed: 1.00,
      color: 'blue'
    },
    CARD_30D: { 
      id: 'CARD_30D',
      name: 'Tarjeta (30 días)', 
      rate: 0.0319, 
      fixed: 1.00,
      color: 'blue'
    },
    YAPE_MP: { 
      id: 'YAPE_MP',
      name: 'Yape vía MP', 
      rate: 0.0399, 
      fixed: 1.00,
      color: 'brand'
    },
    YAPE_DIRECT: { 
      id: 'YAPE_DIRECT',
      name: 'Yape Empresas', 
      rate: 0.0295, 
      fixed: 0,
      color: 'brand'
    },
    QR_MP: { 
      id: 'QR_MP',
      name: 'QR Mercado Pago', 
      rate: 0.0299, 
      fixed: 0,
      color: 'brand'
    },
    CASH: { 
      id: 'CASH',
      name: 'Efectivo / Transferencia', 
      rate: 0.0, 
      fixed: 0,
      color: 'green'
    }
  },
  BUSINESS: {
    MIN_MARGIN_ALERT: 10, // Percent
    DEFAULT_MARGIN: 20
  }
};
