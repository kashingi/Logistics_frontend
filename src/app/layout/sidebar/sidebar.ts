import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  @Input() collapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Catalog',
      icon: 'inventory_2',
      children: [
        { label: 'Products', icon: 'category', route: '/main-layout/products' },
        { label: 'Categories', icon: 'list', route: '/main-layout/categories' },
      ],
    },
    {
      label: 'Procurement',
      icon: 'shopping_cart',
      children: [
        { label: 'Suppliers', icon: 'local_shipping', route: '/main-layout/suppliers' },
        { label: 'Purchase Orders', icon: 'receipt_long', route: '/main-layout/purchase-orders' },
        { label: 'Goods Received', icon: 'move_to_inbox', route: '/main-layout/goods-received-notes' },
        { label: 'Purchase Returns', icon: 'assignment_return', route: '/main-layout/purchase-returns' },
      ],
    },
    {
      label: 'Inventory',
      icon: 'warehouse',
      children: [
        { label: 'Warehouses', icon: 'store', route: '/main-layout/warehouses' },
        { label: 'Stock In', icon: 'add_box', route: '/main-layout/stock-ins' },
        { label: 'Stock Out', icon: 'indeterminate_check_box', route: '/main-layout/stock-outs' },
        { label: 'Stock Transfer', icon: 'swap_horiz', route: '/main-layout/stock-transfers' },
        { label: 'Stock Check', icon: 'fact_check', route: '/main-layout/stock-checks' },
        { label: 'Stock Levels', icon: 'bar_chart', route: '/main-layout/stock' },
      ],
    },
    {
      label: 'Sales',
      icon: 'point_of_sale',
      children: [
        { label: 'Customers', icon: 'people', route: '/main-layout/customers' },
        { label: 'Quotations', icon: 'request_quote', route: '/main-layout/sales-quotations' },
        { label: 'Sales Orders', icon: 'shopping_bag', route: '/main-layout/sales-orders' },
        { label: 'Pending Orders', icon: 'pending_actions', route: '/main-layout/pending-orders' },
      ],
    },
    {
      label: 'Logistics',
      icon: 'local_shipping',
      children: [
        { label: 'Delivery Zones', icon: 'map', route: '/main-layout/delivery-zones' },
        { label: 'Riders', icon: 'two_wheeler', route: '/main-layout/riders' },
        { label: 'Orders for Delivery', icon: 'pending', route: '/main-layout/orders-for-delivery' },
        { label: 'Deliveries', icon: 'delivery_dining', route: '/main-layout/deliveries' },
      ],
    },
  ];

  expandedMenus: string[] = [];

  toggleSubmenu(label: string): void {
    if (this.expandedMenus.includes(label)) {
      this.expandedMenus = this.expandedMenus.filter(m => m !== label);
    } else {
      this.expandedMenus.push(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedMenus.includes(label);
  }
}
