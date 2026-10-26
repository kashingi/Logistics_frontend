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
        { label: 'Products', icon: 'category', route: '/products' },
        { label: 'Categories', icon: 'list', route: '/features/catalog/categories' },
      ],
    },
    {
      label: 'Procurement',
      icon: 'shopping_cart',
      children: [
        { label: 'Suppliers', icon: 'local_shipping', route: '/suppliers' },
        { label: 'Purchase Orders', icon: 'receipt_long', route: '/purchase-orders' },
        { label: 'Goods Received', icon: 'move_to_inbox', route: '/goods-received-notes' },
        { label: 'Purchase Returns', icon: 'assignment_return', route: '/purchase-returns' },
      ],
    },
    {
      label: 'Inventory',
      icon: 'warehouse',
      children: [
        { label: 'Warehouses', icon: 'store', route: '/warehouses' },
        { label: 'Stock In', icon: 'add_box', route: '/stock-ins' },
        { label: 'Stock Out', icon: 'indeterminate_check_box', route: '/stock-outs' },
        { label: 'Stock Transfer', icon: 'swap_horiz', route: '/stock-transfers' },
        { label: 'Stock Check', icon: 'fact_check', route: '/stock-checks' },
        { label: 'Stock Levels', icon: 'bar_chart', route: '/stock' },
      ],
    },
    {
      label: 'Sales',
      icon: 'point_of_sale',
      children: [
        { label: 'Customers', icon: 'people', route: '/customers' },
        { label: 'Quotations', icon: 'request_quote', route: '/sales-quotations' },
        { label: 'Sales Orders', icon: 'shopping_bag', route: '/sales-orders' },
        { label: 'Pending Orders', icon: 'pending_actions', route: '/pending-orders' },
      ],
    },
    {
      label: 'Logistics',
      icon: 'local_shipping',
      children: [
        { label: 'Delivery Zones', icon: 'map', route: '/delivery-zones' },
        { label: 'Riders', icon: 'two_wheeler', route: '/riders' },
        { label: 'Orders for Delivery', icon: 'pending', route: '/orders-for-delivery' },
        { label: 'Deliveries', icon: 'delivery_dining', route: '/deliveries' },
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
