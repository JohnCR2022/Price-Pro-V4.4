# Walkthrough - Calculadora Estratégica de Precios (Price Pro V4)

I have developed a highly reactive, premium financial calculator tailored for the Peruvian RER (RUC 20) regime. The tool solve complex net margin calculations for both sales and purchases.

## Key Features

- **Dual Mode Switching**: Seamlessly toggle between **VENTAS** (Direct Calculation) and **COMPRAS** (Inverse Calculation).
- **Financial Accuracy**: Implements current SUNAT rates:
    - IGV: 18%
    - RER: 1.5% (over base imponible)
- **Payment Gateway Integration**: Built-in logic for Mercado Pago (Card and Yape) including automated IGV calculation on commissions.
- **Premium UI/UX**:
    - **Glassmorphism Design**: Sleek, modern interface using Tailwind CSS.
    - **Mobile-First**: Optimized for both laptops (Lenovo) and mobile devices.
    - **Auto-Select**: Intelligent input focus for rapid editing.
    - **Live Feedback**: Real-time margin validation and error prevention.

## Implementation Details

### Core Logic
The calculation engine uses `useMemo` to evaluate complex financial formulas instantly as you type. It handles:
1. Selling Price optimization based on desired MARGEN NETO.
2. Maximum Cost identification for inventory procurement.
3. Detailed breakdown of IGV, Income Tax (RER), and platform commissions.

### Visual Breakdown
The results are presented in a structured hierarchy:
1. **Precio de costo**
2. **Mercado Pago Fees** (Commission + IGV)
3. **SUNAT Taxes** (IGV 18% + RER 1.5%)
4. **Logistics** (Olva Shipping)
5. **Margen Neto** (Soles and Percentage)

## Verification Results
- [x] **Calculation Check**: Verified against manual test cases for RER compliance.
- [x] **Build Status**: Successful production build using Vite.
- [x] **Validation**: Implemented guards against "Unreachable Margins" (negative denominators).
- [x] **UX**: Verified auto-selection and empty field handling.

> [!TIP]
> Use the **Yape** toggle to instantly see how lower commissions improve your MARGEN NETO for high-volume, low-margin items.
