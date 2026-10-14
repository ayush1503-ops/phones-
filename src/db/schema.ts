import { pgTable, text, integer, jsonb, timestamp, serial } from "drizzle-orm/pg-core";

/**
 * Persistence layer for the redesigned storefront.
 *
 * The product catalogue itself is mirrored from the live WooCommerce store in
 * src/lib/data.ts (a WooCommerce REST sync replaces it in production). These
 * tables capture everything the shop generates at runtime: orders, support
 * requests, return/replacement requests and newsletter subscribers.
 */

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  landmark: text("landmark"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode").notNull(),
  paymentMethod: text("payment_method").notNull(), // "prepaid" | "cod"
  status: text("status").notNull().default("confirmed"),
  items: jsonb("items").notNull(),
  subtotal: integer("subtotal").notNull(),
  shippingFee: integer("shipping_fee").notNull().default(0),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const returnRequests = pgTable("return_requests", {
  id: serial("id").primaryKey(),
  requestType: text("request_type").notNull(), // Refund | Return | Replacement
  orderNumber: text("order_number").notNull(),
  productName: text("product_name").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
