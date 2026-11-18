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
import { PurchaseReturn } from './features/procurement/purchase-return/purchase-return';
import { PendingOrders } from './features/sales/pending-orders/pending-orders';
import { StockChecks } from './features/inventory/stock-checks/stock-checks';
import { StockLevel } from './features/inventory/stock-level/stock-level';
import { Customers } from './features/sales/customers/customers';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'features/auth/signup', component: Signup },
    { path: 'auth/forgot-password', component: ForgotPassword },
    { path: 'auth/verify-email', component: VerifyEmail },
    { path: 'auth/reset-password', component: ResetPassword },
    {
        path: 'main-layout', component: MainLayout, canActivate: [authGuard],
        children: [
            { path: '', component: Dashboard },
            { path: 'categories', component: Categories },
            { path: 'products', component: Products },
            { path: 'warehouses', component: Warehouse },
            { path: 'suppliers', component: Suppliers },
            { path: 'purchase-orders', component: PurchaseOrders },
            { path: 'goods-received-notes', component: GoodsReceivedNotes },
            { path: 'stock-ins', component: StockIn },
            { path: 'stock-outs', component: StockOut },
            { path: 'stock-transfers', component: StockTransfer },
            { path: 'sales-quotations', component: SalesQuotation },
            { path: 'sales-orders', component: SalesOrder },
            { path: 'delivery-zones', component: DeliveryZone },
            { path: 'riders', component: Riders },
            { path: 'orders-for-delivery', component: OrdersForDelivery },
            { path: 'deliveries', component: Deliveries },
            { path: 'purchase-returns', component: PurchaseReturn },
            { path: 'pending-orders', component: PendingOrders },
            { path: 'stock-checks', component: StockChecks },
            { path: 'stock-levels', component: StockLevel },
            { path: 'customers', component: Customers }
        ]
    },
    { path: '**', redirectTo: '' },
];
