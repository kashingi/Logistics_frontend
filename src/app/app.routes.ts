import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { VerifyEmail } from './features/auth/verify-email/verify-email';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { MainLayout } from './layout/main-layout/main-layout';
import { Categories } from './features/catalog/categories/categories';
import { authGuard } from './core/guards/auth-guard';
import { Products } from './features/catalog/products/products';
import { Suppliers } from './features/procurement/suppliers/suppliers';
import { Warehouse } from './features/inventory/warehouse/warehouse';
import { PurchaseOrders } from './features/procurement/purchase-orders/purchase-orders';
import { GoodsReceivedNotes } from './features/procurement/goods-received-notes/goods-received-notes';
import { StockIn } from './features/inventory/stock-in/stock-in';
import { StockOut } from './features/inventory/stock-out/stock-out';
import { StockTransfer } from './features/inventory/stock-transfer/stock-transfer';
import { SalesQuotation } from './features/sales/sales-quotation/sales-quotation';
import { SalesOrder } from './features/sales/sales-order/sales-order';
import { DeliveryZone } from './features/logistics/delivery-zone/delivery-zone';
import { Riders } from './features/logistics/riders/riders';
import { OrdersForDelivery } from './features/logistics/orders-for-delivery/orders-for-delivery';
import { Deliveries } from './features/logistics/deliveries/deliveries';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'features/auth/signup', component: Signup },
    { path: 'auth/forgot-password', component: ForgotPassword },
    { path: 'auth/verify-email', component: VerifyEmail },
    { path: 'auth/reset-password', component: ResetPassword },
    {
        path: 'main-layout', component: MainLayout,
        children: [
            { path: 'categories', component: Categories, canActivate: [authGuard] },
            { path: 'products', component: Products, canActivate: [authGuard] },
            { path: 'warehouses', component: Warehouse, canActivate: [authGuard] },
            { path: 'suppliers', component: Suppliers, canActivate: [authGuard] },
            { path: 'purchase-orders', component: PurchaseOrders, canActivate: [authGuard] },
            { path: 'goods-received-notes', component: GoodsReceivedNotes, canActivate: [authGuard] },
            { path: 'stock-ins', component: StockIn, canActivate: [authGuard] },
            { path: 'stock-outs', component: StockOut, canActivate: [authGuard] },
            { path: 'stock-transfers', component: StockTransfer, canActivate: [authGuard] },
            { path: 'sales-quotations', component: SalesQuotation, canActivate: [authGuard] },
            { path: 'sales-orders', component: SalesOrder, canActivate: [authGuard] },
            { path: 'delivery-zones', component: DeliveryZone, canActivate: [authGuard] },
            { path: 'riders', component: Riders, canActivate: [authGuard] },
            { path: 'orders-for-delivery', component: OrdersForDelivery, canActivate: [authGuard] },
            { path: 'deliveries', component: Deliveries, canActivate: [authGuard] }
        ]
    },
    { path: '**', redirectTo: '' },
];
